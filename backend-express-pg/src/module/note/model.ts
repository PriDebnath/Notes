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

export const notes = pgTable(
    'notes',
    {
        id: serial('id').primaryKey(),
        text: text('text').notNull(),
        created_at: timestamp('created_at').defaultNow().notNull(),
        updated_at: timestamp('updated_at').defaultNow().notNull(),
        deleted_at: timestamp('deleted_at'),
        is_deleted: boolean('is_deleted').default(false).notNull(),
        user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull()
    }
)