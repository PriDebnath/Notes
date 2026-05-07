import { db } from "@/db/db";
import { getOrAddTag } from "@/db/tag.db";
import type { Tag, SortOption, GetAllNotesDetailsParam } from "@/model/index.model";

export const linkNoteTag = async (noteId: number, tagId: number) => {
  await db.notes_tags.add({ noteId, tagId });
};

export const addTagToNote = async (noteId: number, tagName: string) => {
  return db.transaction("rw", db.tags, db.notes_tags, async () => {
    const tag = await getOrAddTag(tagName);

    await db.notes_tags.add({
      noteId,
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
    db.notes_tags,
    db.tags,
    async () => {
      // #1 Query all tables
      let notes = await db.notes.toArray()
      let tags = await db.tags.toArray()
      let note_tags = await db.notes_tags.toArray()

      // #2 Store tags by their id
      const tagsById = new Map<number, Tag>(tags.map(t => [t.id!, t])); // eq: 3 → { id: 3, name: "life" }

      // #3 find links
      const linksByNoteId = new Map<number, Tag[]>(); // eq: 1 → [{ id: 3, name: "life" }]
      for (const link of note_tags) {
        const tag = tagsById.get(link.tagId);
        if (!tag) continue;

        if (!linksByNoteId.has(link.noteId)) {
          linksByNoteId.set(link.noteId, []);
        }
        linksByNoteId.get(link.noteId)!.push(tag);
      }
      // #4 return formated data
      let notesResult = notes.map((q) => {
        return {
          ...q,
          tags: linksByNoteId.get(q?.id!) || []
        }
      })
      return notesResult
    })
}


export const getAllNotesDetails = async (param: GetAllNotesDetailsParam) => {
  const { sortBy = 'created_at', include = 'all' } = param
  return db.transaction(
    "r",
    db.notes,
    db.notes_tags,
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
      let note_tags = await db.notes_tags.toArray()

      // #2 Store tags by their id
      const tagsById = new Map<number, Tag>(tags.map(t => [t.id!, t])); // eq: 3 → { id: 3, name: "life" }

      // #3 find links
      const linksByNoteId = new Map<number, Tag[]>(); // eq: 1 → [{ id: 3, name: "life" }]
      for (const link of note_tags) {
        const tag = tagsById.get(link.tagId);
        if (!tag) continue;

        if (!linksByNoteId.has(link.noteId)) {
          linksByNoteId.set(link.noteId, []);
        }
        linksByNoteId.get(link.noteId)!.push(tag);
      }
      // #4 join tags
      let notesResult = notes.map((q) => {
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

        notesResult.sort((a, b) => compareByTags(a.tags as any, b.tags as any));
      }

      // #6 move pinned notes to the top, preserving relative order
      const pinned = notesResult.filter(q => q.pinned);
      const unpinned = notesResult.filter(q => !q.pinned);

      return [...pinned, ...unpinned];
    })
}


export const getNoteDetails = async (noteId: number) => {
  return db.transaction("r", db.notes, db.notes_tags, db.tags, async () => {
    const note = await db.notes.get(noteId);
    if (!note) return;

    const links = await db.notes_tags
      .where("noteId")
      .equals(noteId)
      .toArray();

    const tagIds = links.map(l => l.tagId);

    const tags =
      tagIds.length === 0
        ? []
        : await db.tags.where("id").anyOf(tagIds).toArray();

    return { ...note, tags };
  });
};


export const deleteNoteWithLinks = async (noteId: number) => {
  return db.transaction(
    "rw",
    db.notes,
    db.notes_tags,
    async () => {

      // 1️⃣ delete all links for this note
      await db.notes_tags
        .where("noteId")
        .equals(noteId)
        .delete();

      // 2️⃣ delete the note itself
      await db.notes.delete(noteId);
    }
  );
};


export const deleteNoteTagLinks = async (noteId: number) => {
  return db.transaction(
    "rw",
    db.notes_tags,
    async () => {

      // 1️⃣ delete all links for this note
      await db.notes_tags
        .where("noteId")
        .equals(noteId)
        .delete();
    }
  );
};
