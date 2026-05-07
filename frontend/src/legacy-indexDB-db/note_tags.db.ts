import { openDB, STORES } from './db'
import type { NoteDetails, NoteTags, Tag } from '@/model/index.model'

const STORE = STORES.QUOTES_TAGS

/* ===================== QUOTE ↔ TAG (JUNCTION) ===================== */

export const getAllNoteTags = async (): Promise<NoteTags[]> => {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readonly')
  const store = tx.objectStore(STORE)

  return new Promise((resolve, reject) => {
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject('Failed to get note tags')
  })
}

export const addNoteTag = async (data: NoteTags): Promise<NoteTags> => {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)

  const newNoteTag: NoteTags = {
    quoteId: data.quoteId,
    tagId: data.tagId,
  }
  store.put(newNoteTag)

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(data)
    tx.onerror = () => reject('Failed to add note tag')
  })
}

export const updateNoteTag = async (
  data: NoteTags
): Promise<NoteTags> => {
  if (data.id == null) {
    throw new Error('NoteTag id required')
  }

  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)

  return new Promise((resolve, reject) => {
    const req = store.put(data)
    req.onsuccess = () => resolve(data)
    req.onerror = () => reject('Failed to update note tag')
  })
}

export const deleteNoteTag = async (id: number): Promise<void> => {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)

  store.delete(id)

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject('Failed to delete note tag')
  })
}

export const deleteAllNoteTags = async (
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
    tx.onerror = () => reject('Failed to delete note tags')
  })
}

/* ===================== READ MODELS ===================== */

export const getNoteDetails = async (
  quoteId: number
): Promise<NoteDetails | null> => {
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
      const note = quoteReq.result
      if (!note) {
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
          ...note,
          tags,
        })
      }
    }

    tx.onerror = () => reject('Failed to load note details')
  })
}

export const getAllNotesDetails = async (): Promise<NoteDetails[]> => {
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
      const result: NoteDetails[] = []

      for (const note of quotesReq.result) {
        const links = await new Promise<NoteTags[]>((res) => {
          const r = junctionStore
            .index('quoteId')
            .getAll(note.id)
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
          ...note,
          tags,
        })
      }

      resolve(result)
    }

    tx.onerror = () => reject('Failed to load notes details')
  })
}
