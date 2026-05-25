

import type { quotes } from "@/src/module/quote/model"

export type Quote = typeof quotes.$inferSelect

export type NewQuote = Omit<
    Quote,
    "id"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
    | "isDeleted"
>