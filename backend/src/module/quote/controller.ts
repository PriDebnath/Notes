import { Elysia } from 'elysia'
import { quoteService } from '@/src/module/quote/service'

export const quote = new Elysia({ prefix: '/quote' })
    .get(
        '/',
        async ({ body, cookie: { session } }) => {
            const response = await quoteService.getQuotes()
            return response
        }, {
        detail: {
            summary: 'Get all quotes',
            description: 'Get all quotes',
            tags: ['quote'],
        }
    }
    )