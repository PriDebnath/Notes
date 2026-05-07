import type { Quote } from "@/model/index.model";
import { db } from "@/db/db";

export const addQuote = async (note: Quote) => {
  const { id, ...data } = note;
  const generatedId = await db.quotes.add({
    ...data,
    pinned: data.pinned ?? false,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return { ...note, id: generatedId };
};

export const updateQuote = async (note: Quote) => {
  if (!note.id) throw new Error("Quote id required");

  await db.quotes.update(note.id, {
    ...note,
    updated_at: new Date(),
  });

  return note;
};

export const toggleQuotePinned = async (id: number, pinned: boolean) => {
  await db.quotes.update(id, {
    pinned,
    updated_at: new Date(),
  });
}
