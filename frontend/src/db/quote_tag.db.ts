import { db } from "@/db/db";
import { getOrAddTag } from "@/db/tag.db";

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
