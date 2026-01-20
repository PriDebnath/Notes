import type { Quote } from "@/model/index.model";
import { db } from "@/db/db";

export const addQuote = async (quote: Quote) =>  {
    const { id, ...data } = quote
    const generatedId = await db.quotes.add({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
    });

    return { ...quote, id: generatedId };
};

export const updateQuote = async (quote: Quote) => {
  if (!quote.id) throw new Error("Quote id required");

  await db.quotes.update(quote.id, {
    ...quote,
    updated_at: new Date(),
  });

  return quote;
};
