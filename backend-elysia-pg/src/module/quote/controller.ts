import { Elysia, t } from 'elysia'
import { quoteService } from '@/src/module/quote/service'
import { createQuoteSchema, queryQuoteSchema, updateQuoteSchema } from '@/src/module/quote/type'
import { authPlugin } from '../auth/plugin'

export const quoteController = new Elysia({ prefix: '/quote' })
    .use(authPlugin)
    .get(
        '/:id',
        async ({ params, cookie: { session } }) => {
            const response = await quoteService.getQuote(params.id)
            return response
        }, {
        params: queryQuoteSchema,
        detail: {
            summary: 'Get a quote by id',
            description: 'Get a quote by id',
            tags: ['quote'],
        }
    }
    )
    .patch(
        '/:id',
        async ({ params, body, cookie: { session } }) => {
            const response = await quoteService.updateQuote(params.id, body.text)
            return response
        }, {
        params: queryQuoteSchema,
        body: updateQuoteSchema,
        detail: {
            summary: 'Update a quote by id',
            description: 'Update a quote by id',
            tags: ['quote'],
        }
    })
    .delete(
        '/:id',
        async ({ params, cookie: { session } }) => {
            const response = await quoteService.deleteQuote(params.id)
            return response
        }, {
        params: queryQuoteSchema,
        detail: {
            summary: 'Delete a quote by id',
            description: 'Delete a quote by id',
            tags: ['quote'],
        }
    })
    .get("/", async ({ cookie: { session } }) => {
        const response = await quoteService.getQuotes()
        return response
    }, {
        detail: {
            summary: 'Get all quotes',
            description: 'Get all quotes',
            tags: ['quote'],
        }
    })
    .post(
        '/',
        async (req) => {
            const { body, cookie: { session }, authUser }=req
            const response = await quoteService.createQuote({
                text: body.text,
                user_id: authUser?.id!
            })
            return response
        }, {
        body: createQuoteSchema,
        detail: {
            summary: 'Create a new quote',
            description: 'Create a new quote',
            tags: ['quote'],
        }
    }
    )