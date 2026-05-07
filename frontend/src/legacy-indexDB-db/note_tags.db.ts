import { openDB, STORES } from './db'
import type { NoteDetails, NoteTags, Tag } from '@/model/index.model'

const STORE = STORES.NOTES_TAGS

/* ===================== NOTE ↔ TAG (JUNCTION) ===================== */

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
    noteId: data.noteId,
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
  noteId: number
): Promise<void> => {
  const db = await openDB()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)

  const req = store.index('noteId').getAll(noteId)

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
  noteId: number
): Promise<NoteDetails | null> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(
      [STORES.NOTES, STORES.TAGS, STORES.NOTES_TAGS],
      'readonly'
    )

    const notesStore = tx.objectStore(STORES.NOTES)
    const tagsStore = tx.objectStore(STORES.TAGS)
    const junctionStore = tx.objectStore(STORES.NOTES_TAGS)

    const noteReq = notesStore.get(noteId)

    noteReq.onsuccess = async () => {
      const note = noteReq.result
      if (!note) {
        resolve(null)
        return
      }

      const linkReq = junctionStore
        .index('noteId')
        .getAll(noteId)

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
      [STORES.NOTES, STORES.TAGS, STORES.NOTES_TAGS],
      'readonly'
    )

    const notesStore = tx.objectStore(STORES.NOTES)
    const tagsStore = tx.objectStore(STORES.TAGS)
    const junctionStore = tx.objectStore(STORES.NOTES_TAGS)

    const notesReq = notesStore.getAll()

    notesReq.onsuccess = async () => {
      const result: NoteDetails[] = []

      for (const note of notesReq.result) {
        const links = await new Promise<NoteTags[]>((res) => {
          const r = junctionStore
            .index('noteId')
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
