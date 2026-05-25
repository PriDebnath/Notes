

import { boolean, char, pgTable, serial, text, timestamp, varchar} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: serial().primaryKey(),
    first_name:  varchar( { length: 100 }),
    last_name:  varchar( { length: 100 }),
    email: text().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull(),
    is_deleted: boolean().default(false),
})
