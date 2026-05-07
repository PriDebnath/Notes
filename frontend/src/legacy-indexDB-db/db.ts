/* # THINGS TO REMEMBER
* Every IndexedDB schema change = DB_VERSION++
* Schema changes include:
* - new object store
* - new index
* - keyPath change
*/
const DB_NAME = 'notes_keeper_db_by_pri';
const DB_VERSION = 7

export const STORES = {
  NOTES: 'notes',
  TAGS: 'tags',
  NOTES_TAGS: 'notes_tags', // many to many relationship
} as const


const createNotesStore = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(STORES.NOTES)) {
    db.createObjectStore(STORES.NOTES, {
      keyPath: 'id',
      autoIncrement: true,
    })
  }
}

const createTagsStore = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(STORES.TAGS)) {
    const store = db.createObjectStore(STORES.TAGS, {
      keyPath: 'id',
      autoIncrement: true,
    })

    // tag name must be unique
    store.createIndex('name', 'name', { unique: true })
  }
}

const createNotesTagsStore = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(STORES.NOTES_TAGS)) {
    const store = db.createObjectStore(STORES.NOTES_TAGS, {
      keyPath: 'id',
      autoIncrement: true,
    })

    store.createIndex('noteId', 'noteId')
    store.createIndex('tagId', 'tagId')

    // prevent duplicate links
    store.createIndex(
      'noteId_tagId',
      ['noteId', 'tagId'],
      { unique: true }
    )
  }
}

/* ===================== DB OPEN ===================== */

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result

      // delete all stores(@TODO: should not use in production, plan migration)
      deleteStores(db) 

      createNotesStore(db)
      createTagsStore(db)
      createNotesTagsStore(db)
    }

    request.onerror = () => reject('Failed to open IndexedDB')
    request.onsuccess = () => resolve(request.result)
  })
}

const deleteStores = (db: IDBDatabase) => {
  if (db.objectStoreNames.contains(STORES.NOTES)) {
    db.deleteObjectStore(STORES.NOTES)
  }
  if (db.objectStoreNames.contains(STORES.TAGS)) {
    db.deleteObjectStore(STORES.TAGS)
  }
  if (db.objectStoreNames.contains(STORES.NOTES_TAGS)) {
    db.deleteObjectStore(STORES.NOTES_TAGS)
  }
}