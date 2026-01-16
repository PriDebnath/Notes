import { openDB, STORES } from '@/db/db'
import type { QuoteDetails, QuoteTags, Tag } from '@/model/quote.model'

const STORE = STORES.QUOTES_TAGS

/* ===================== QUOTE ↔ TAG (JUNCTION) ===================== */

export const getAllQuoteTags = async (): Promise<QuoteTags[]> => {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readonly')
  const store = tx.objectStore(STORE)

  return new Promise((resolve, reject) => {
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject('Failed to get quote tags')
  })
}

export const addQuoteTag = async (data: QuoteTags): Promise<QuoteTags> => {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)

  const newQuoteTag: QuoteTags = {
    quoteId: data.quoteId,
    tagId: data.tagId,
  }
  store.put(newQuoteTag)

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(data)
    tx.onerror = () => reject('Failed to add quote tag')
  })
}

export const updateQuoteTag = async (
  data: QuoteTags
): Promise<QuoteTags> => {
  if (data.id == null) {
    throw new Error('QuoteTag id required')
  }

  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)

  return new Promise((resolve, reject) => {
    const req = store.put(data)
    req.onsuccess = () => resolve(data)
    req.onerror = () => reject('Failed to update quote tag')
  })
}

export const deleteQuoteTag = async (id: number): Promise<void> => {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)

  store.delete(id)

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject('Failed to delete quote tag')
  })
}

export const deleteAllQuoteTags = async (
  quoteId: number
): Promise<void> => {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)

  const req = store.index('quoteId').getAll(quoteId)

  req.onsuccess = () => {
    req.result.forEach((r) => store.delete(r.id))
  }

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject('Failed to delete quote tags')
  })
}

/* ===================== READ MODELS ===================== */

export const getQuoteDetails = async (
  quoteId: number
): Promise<QuoteDetails | null> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(
      [STORES.QUOTES, STORES.TAGS, STORES.QUOTES_TAGS],
      'readonly'
    )

    const quotesStore = tx.objectStore(STORES.QUOTES)
    const tagsStore = tx.objectStore(STORES.TAGS)
    const junctionStore = tx.objectStore(STORES.QUOTES_TAGS)

    const quoteReq = quotesStore.get(quoteId)

    quoteReq.onsuccess = async () => {
      const quote = quoteReq.result
      if (!quote) {
        resolve(null)
        return
      }

      const linkReq = junctionStore
        .index('quoteId')
        .getAll(quoteId)

      linkReq.onsuccess = async () => {
        const tags: Tag[] = []

        for (const link of linkReq.result) {
          const tagReq = tagsStore.get(link.tagId)
          const tag = await new Promise<Tag | null>((res) => {
            tagReq.onsuccess = () => res(tagReq.result ?? null)
          })
          if (tag) tags.push(tag)
        }

        resolve({
          ...quote,
          tags,
        })
      }
    }

    tx.onerror = () => reject('Failed to load quote details')
  })
}

export const getAllQuotesDetails = async (): Promise<QuoteDetails[]> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(
      [STORES.QUOTES, STORES.TAGS, STORES.QUOTES_TAGS],
      'readonly'
    )

    const quotesStore = tx.objectStore(STORES.QUOTES)
    const tagsStore = tx.objectStore(STORES.TAGS)
    const junctionStore = tx.objectStore(STORES.QUOTES_TAGS)

    const quotesReq = quotesStore.getAll()

    quotesReq.onsuccess = async () => {
      const result: QuoteDetails[] = []

      for (const quote of quotesReq.result) {
        const links = await new Promise<QuoteTags[]>((res) => {
          const r = junctionStore
            .index('quoteId')
            .getAll(quote.id)
          r.onsuccess = () => res(r.result)
        })

        const tags: Tag[] = []

        for (const l of links) {
          const tag = await new Promise<Tag | null>((res) => {
            const r = tagsStore.get(l.tagId)
            r.onsuccess = () => res(r.result ?? null)
          })
          if (tag) tags.push(tag)
        }

        result.push({
          ...quote,
          tags,
        })
      }

      resolve(result)
    }

    tx.onerror = () => reject('Failed to load quotes details')
  })
}
