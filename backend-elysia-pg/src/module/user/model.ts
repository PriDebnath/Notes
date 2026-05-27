

import { boolean, char, pgTable, serial, text, timestamp, varchar} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: serial().primaryKey(),
    name:  varchar( { length: 100 }),
    password:  varchar( { length: 200 }).notNull(),
    email: text().unique().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull(),
    is_deleted: boolean().default(false),
})
