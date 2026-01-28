import DOMPurify from 'dompurify'

export const sanitizeHTML = (html: string): string => {
    if (!html) {
        console.warn('No html found')
        return ""
    }
    return DOMPurify.sanitize(html)
}