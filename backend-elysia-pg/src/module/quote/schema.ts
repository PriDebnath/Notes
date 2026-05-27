

import type { quotes } from "@/src/module/quote/model"

export type Quote = typeof quotes.$inferSelect

export type NewQuote = Omit<
    Quote,
    "id"
    | "created_at"
    | "updated_at"
    | "deleted_at"
    | "is_deleted"
>