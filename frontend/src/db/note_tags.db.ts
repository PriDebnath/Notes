import { db } from "@/db/db";
import { getOrAddTag } from "@/db/tag.db";
import type { Tag, SortOption, GetAllNotesDetailsParam } from "@/model/index.model";

export const linkNoteTag = async (quoteId: number, tagId: number) => {
  await db.quotes_tags.add({ quoteId, tagId });
};

export const addTagToNote = async (quoteId: number, tagName: string) => {
  return db.transaction("rw", db.tags, db.quotes_tags, async () => {
    const tag = await getOrAddTag(tagName);

    await db.quotes_tags.add({
      quoteId,
      tagId: tag.id!,
    });

    return tag;
  });
};

/**
 * Sort do not support here
 */
export const getAllNotesDetailsOld = async () => {
  return db.transaction(
    "r",
    db.notes,
    db.quotes_tags,
    db.tags,
    async () => {
      // #1 Query all tables
      let notes = await db.notes.toArray()
      let tags = await db.tags.toArray()
      let quote_tags = await db.quotes_tags.toArray()

      // #2 Store tags by their id
      const tagsById = new Map<number, Tag>(tags.map(t => [t.id!, t])); // eq: 3 → { id: 3, name: "life" }

      // #3 find links
      const linksByNoteId = new Map<number, Tag[]>(); // eq: 1 → [{ id: 3, name: "life" }]
      for (const link of quote_tags) {
        const tag = tagsById.get(link.tagId);
        if (!tag) continue;

        if (!linksByNoteId.has(link.quoteId)) {
          linksByNoteId.set(link.quoteId, []);
        }
        linksByNoteId.get(link.quoteId)!.push(tag);
      }
      // #4 return formated data
      let quotesResult = notes.map((q) => {
        return {
          ...q,
          tags: linksByNoteId.get(q?.id!) || []
        }
      })
      return quotesResult
    })
}


export const getAllNotesDetails = async (param: GetAllNotesDetailsParam) => {
  const { sortBy = 'created_at', include = 'all' } = param
  return db.transaction(
    "r",
    db.notes,
    db.quotes_tags,
    db.tags,
    async () => {
      // #1 Query all tables with DB-level ordering where possible
      let notes =
        sortBy === "created_at"
          ? await db.notes.orderBy("created_at").reverse().toArray()
          : sortBy === "updated_at"
            ? await db.notes.orderBy("updated_at").reverse().toArray()
            : await db.notes.toArray()

      // #1.a get non-deleted 
      if (include == 'non-deleted') {
        notes = notes.filter((item) => item.deleted !== true)
      }
      // #1.b get deleted 
      if (include == 'deleted') {
        notes = notes.filter((item) => item.deleted === true)
      }

      let tags = await db.tags.toArray()
      let quote_tags = await db.quotes_tags.toArray()

      // #2 Store tags by their id
      const tagsById = new Map<number, Tag>(tags.map(t => [t.id!, t])); // eq: 3 → { id: 3, name: "life" }

      // #3 find links
      const linksByNoteId = new Map<number, Tag[]>(); // eq: 1 → [{ id: 3, name: "life" }]
      for (const link of quote_tags) {
        const tag = tagsById.get(link.tagId);
        if (!tag) continue;

        if (!linksByNoteId.has(link.quoteId)) {
          linksByNoteId.set(link.quoteId, []);
        }
        linksByNoteId.get(link.quoteId)!.push(tag);
      }
      // #4 join tags
      let quotesResult = notes.map((q) => {
        return {
          ...q,
          tags: linksByNoteId.get(q?.id!) || []
        }
      })

      // #5 for tag-based sort, sort in JS (needs joined data)
      if (sortBy === "tags") {
        const compareByTags = (aTags?: Tag[], bTags?: Tag[]) => {
          const aName = aTags && aTags.length > 0 ? aTags[0].name.toLowerCase() : "";
          const bName = bTags && bTags.length > 0 ? bTags[0].name.toLowerCase() : "";
          if (aName < bName) return -1;
          if (aName > bName) return 1;
          return 0;
        };

        quotesResult.sort((a, b) => compareByTags(a.tags as any, b.tags as any));
      }

      // #6 move pinned notes to the top, preserving relative order
      const pinned = quotesResult.filter(q => q.pinned);
      const unpinned = quotesResult.filter(q => !q.pinned);

      return [...pinned, ...unpinned];
    })
}


export const getNoteDetails = async (quoteId: number) => {
  return db.transaction("r", db.notes, db.quotes_tags, db.tags, async () => {
    const note = await db.notes.get(quoteId);
    if (!note) return;

    const links = await db.quotes_tags
      .where("quoteId")
      .equals(quoteId)
      .toArray();

    const tagIds = links.map(l => l.tagId);

    const tags =
      tagIds.length === 0
        ? []
        : await db.tags.where("id").anyOf(tagIds).toArray();

    return { ...note, tags };
  });
};


export const deleteNoteWithLinks = async (quoteId: number) => {
  return db.transaction(
    "rw",
    db.notes,
    db.quotes_tags,
    async () => {

      // 1️⃣ delete all links for this note
      await db.quotes_tags
        .where("quoteId")
        .equals(quoteId)
        .delete();

      // 2️⃣ delete the note itself
      await db.notes.delete(quoteId);
    }
  );
};


export const deleteNoteTagLinks = async (quoteId: number) => {
  return db.transaction(
    "rw",
    db.quotes_tags,
    async () => {

      // 1️⃣ delete all links for this note
      await db.quotes_tags
        .where("quoteId")
        .equals(quoteId)
        .delete();
    }
  );
};
