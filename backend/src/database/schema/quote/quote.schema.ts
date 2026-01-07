import {
    pgTable,
    timestamp,
    serial,
    text,
    boolean
} from 'drizzle-orm/pg-core'

export const quotes = pgTable(
    'quotes',
    {
        id: serial('id').primaryKey(),
        text: text('text').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
        deletedAt: timestamp('deleted_at'),
        isDeleted: boolean('is_deleted').default(false).notNull(),
    }
)

export const table = {
	quotes
} as const

export type Table = typeof table