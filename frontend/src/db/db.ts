/* # THINGS TO REMEMBER
* Every IndexedDB schema change = DB_VERSION++
* Schema changes include:
* - new object store
* - new index
* - keyPath change
*/
const DB_NAME = 'quotes_keeper_db_by_pri';
const DB_VERSION = 2

export const STORES = {
  QUOTES: 'quotes',
  TAGS: 'tags',
  QUOTES_TAGS: 'quotes_tags', // many to many relationship
} as const


const createQuotesStore = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(STORES.QUOTES)) {
    db.createObjectStore(STORES.QUOTES, { keyPath: 'id',
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

const createQuotesTagsStore = (db: IDBDatabase) => {
  if (!db.objectStoreNames.contains(STORES.QUOTES_TAGS)) {
    const store = db.createObjectStore(STORES.QUOTES_TAGS, {
      keyPath: 'id',
        autoIncrement: true,
    })

    store.createIndex('quoteId', 'quoteId')
    store.createIndex('tagId', 'tagId')

    // prevent duplicate links
    store.createIndex(
      'quoteId_tagId',
      ['quoteId', 'tagId'],
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

      createQuotesStore(db)
      createTagsStore(db)
      createQuotesTagsStore(db)
    }

    request.onerror = () => reject('Failed to open IndexedDB')
    request.onsuccess = () => resolve(request.result)
  })
}

