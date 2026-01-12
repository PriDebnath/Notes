/* # THINGS TO REMEMBER
* Every IndexedDB schema change = DB_VERSION++
* Schema changes include:
* - new object store
* - new index
* - keyPath change
*/
const DB_NAME = 'quotes_keeper_db_by_pri';
const DB_VERSION = 1 ;

export const STORES = {
    QUOTES: 'quotes',
    TAGS: 'tags',

    QUOTES_TAGS: 'quotes_tags', // many to many relationship between quotes and tags.
} as const;

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            // const db = e.target?.result as IDBDatabase;
            const db = request.result;
            Object.values(STORES).forEach((storeName) => {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: 'id' });
                }
            });
        };
        request.onerror = (e) => {
            reject('Error opening database');
        };
        request.onsuccess = (e) => {
            resolve((e.target as IDBRequest).result);
        };
    });
};


