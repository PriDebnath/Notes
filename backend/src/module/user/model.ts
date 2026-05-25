

import { boolean, char, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: serial().primaryKey(),
    first_name: char(),
    last_name: char(),
    email: text().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull(),
    is_deleted: boolean().default(false),
})
