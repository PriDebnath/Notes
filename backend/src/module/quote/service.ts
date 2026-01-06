// import type { Quote } from '@/model/quote.model'

class QuoteService {    
    async getQuotes(): Promise<any[]> {
        return [
            {
                id: 1,
                text: 'The only way to do great work is to love what you do.'
            },
            {
                id: 2,
                text: 'The best way to predict the future is to invent it.'
            },
            {
                id: 3,
                text: 'The only way to do great work is to love what you do.'
            }
        ]
    }
}

export const quoteService = new QuoteService()