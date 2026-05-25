
import { eq } from 'drizzle-orm'
import { db } from '@/src/database/connection'
import { table } from '@/src/database/model'
import type { NewQuote, Quote } from '@/src/module/quote/schema'

class QuoteService {    
    async getQuote(id: number): Promise<Quote | null> {
        const quote = await db.select()
        .from(table.quotes)
        .where(eq(table.quotes.id, id))
        .limit(1)
        return quote[0] ?? null
    }
    async getQuotes(): Promise<Quote[]> {
        const quotes = await db.select().from(table.quotes)
        return quotes
    }
    async createQuote(quote: NewQuote): Promise<Quote> {
        const newQuote = await db.insert(table.quotes).values({
            ...quote,
            created_at: new Date(),
            updated_at: new Date(),
        }).returning()
        return newQuote[0]
    }
    async updateQuote(id: number, text: string): Promise<Quote> {
        const updatedQuote = await db.update(table.quotes).set({
            text: text,
            updated_at: new Date(),
        }).where(eq(table.quotes.id, id)).returning()
        return updatedQuote[0]
    }
    async deleteQuote(id: number): Promise<Quote> {
        const deletedQuote = await db.update(table.quotes).set({
            deleted_at: new Date(),
            is_deleted: true,
        }).where(eq(table.quotes.id, id)).returning()
        return deletedQuote[0]
    }
}

export const quoteService = new QuoteService()