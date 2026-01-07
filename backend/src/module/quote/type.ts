import { t } from "elysia"

export const createQuoteSchema = t.Object({
    text: t.String(),
})

export const getQuoteSchema = t.Object({
    id: t.Number(),
})