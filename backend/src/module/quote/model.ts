import {
    pgTable,
    timestamp,
    serial,
    text,
    boolean,
    foreignKey,
    integer
} from 'drizzle-orm/pg-core'
import { users } from '../user/model'

export const quotes = pgTable(
    'quotes',
    {
        id: serial('id').primaryKey(),
        text: text('text').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
        deletedAt: timestamp('deleted_at'),
        isDeleted: boolean('is_deleted').default(false).notNull(),
        userId: integer().references(() => users.id, { onDelete: "cascade" })
    }
)