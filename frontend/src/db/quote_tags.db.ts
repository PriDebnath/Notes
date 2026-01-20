import { db } from "@/db/db";
import { getOrAddTag } from "@/db/tag.db";
import type { Tag, SortOption } from "@/model/index.model";

export const linkQuoteTag = async (quoteId: number, tagId: number) => {
    await db.quotes_tags.add({ quoteId, tagId });
};

export const addTagToQuote = async (quoteId: number, tagName: string) => {
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
export const getAllQuotesDetailsOld = async () => {
    return db.transaction(
        "r",
        db.quotes,
        db.quotes_tags,
        db.tags,
        async () => {
            // #1 Query all tables
            let quotes = await db.quotes.toArray()
            let tags = await db.tags.toArray()
            let quote_tags = await db.quotes_tags.toArray()

            // #2 Store tags by their id
            const tagsById = new Map<number, Tag>(tags.map(t => [t.id!, t])); // eq: 3 → { id: 3, name: "life" }

            // #3 find links
            const linksByQuoteId = new Map<number, Tag[]>(); // eq: 1 → [{ id: 3, name: "life" }]
            for (const link of quote_tags) {
                const tag = tagsById.get(link.tagId);
                if (!tag) continue;

                if (!linksByQuoteId.has(link.quoteId)) {
                    linksByQuoteId.set(link.quoteId, []);
                }
                linksByQuoteId.get(link.quoteId)!.push(tag);
            }
            // #4 return formated data
            let quotesResult = quotes.map((q) => {
                return {
                    ...q,
                    tags: linksByQuoteId.get(q?.id!) || []
                }
            })
            return quotesResult
        })
}


export const getAllQuotesDetails = async (sortBy: SortOption = "created_at") => {
  return db.transaction(
    "r",
    db.quotes,
    db.quotes_tags,
    db.tags,
    async () => {
      // #1 Query all tables with DB-level ordering where possible
      let quotes =
        sortBy === "created_at"
          ? await db.quotes.orderBy("created_at").reverse().toArray()
          : sortBy === "updated_at"
          ? await db.quotes.orderBy("updated_at").reverse().toArray()
          : await db.quotes.toArray()

      let tags = await db.tags.toArray()
      let quote_tags = await db.quotes_tags.toArray()

      // #2 Store tags by their id
      const tagsById = new Map<number, Tag>(tags.map(t => [t.id!, t])); // eq: 3 → { id: 3, name: "life" }

      // #3 find links
      const linksByQuoteId = new Map<number, Tag[]>(); // eq: 1 → [{ id: 3, name: "life" }]
      for (const link of quote_tags) {
        const tag = tagsById.get(link.tagId);
        if (!tag) continue;

        if (!linksByQuoteId.has(link.quoteId)) {
          linksByQuoteId.set(link.quoteId, []);
        }
        linksByQuoteId.get(link.quoteId)!.push(tag);
      }
      // #4 join tags
      let quotesResult = quotes.map((q) => {
        return {
          ...q,
          tags: linksByQuoteId.get(q?.id!) || []
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

      return quotesResult
    })
}


export const getQuoteDetails = async (quoteId: number) => {
  return db.transaction("r", db.quotes, db.quotes_tags, db.tags, async () => {
    const quote = await db.quotes.get(quoteId);
    if (!quote) return;

    const links = await db.quotes_tags
      .where("quoteId")
      .equals(quoteId)
      .toArray();

    const tagIds = links.map(l => l.tagId);

    const tags =
      tagIds.length === 0
        ? []
        : await db.tags.where("id").anyOf(tagIds).toArray();

    return { ...quote, tags };
  });
};


export const deleteQuoteWithLinks = async (quoteId: number) => {
  return db.transaction(
    "rw",
    db.quotes,
    db.quotes_tags,
    async () => {

      // 1️⃣ delete all links for this quote
      await db.quotes_tags
        .where("quoteId")
        .equals(quoteId)
        .delete();

      // 2️⃣ delete the quote itself
      await db.quotes.delete(quoteId);
    }
  );
};


export const deleteQuoteTagLinks = async (quoteId: number) => {
  return db.transaction(
    "rw",
    db.quotes_tags,
    async () => {

      // 1️⃣ delete all links for this quote
      await db.quotes_tags
        .where("quoteId")
        .equals(quoteId)
        .delete();
    }
  );
};
