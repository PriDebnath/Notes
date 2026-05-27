import { t } from "elysia"

export const createQuoteSchema = t.Object({
    text: t.String(),
})

export const queryQuoteSchema = t.Object({
    id: t.Number(),
})

export const updateQuoteSchema = t.Object({
    text: t.String(),
})