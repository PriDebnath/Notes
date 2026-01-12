import { openDB, STORES } from "@/db/db";
import type { Tag } from "@/model/quote.model";

const STORE_NAME = STORES.TAGS;
 
export const getAllTags = async (): Promise<Tag[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error getting ' + STORE_NAME);
  });
};


export const addTag = async (tag: Tag): Promise<Tag> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.put(tag);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(tag);
    transaction.onerror = () => reject('Error adding tag');
  });
};

export const updateTag = async (tag: Tag): Promise<Tag> => {
  if (tag.id == null) {
    throw new Error('Tag id is required for update');
  }

  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const request = store.put(tag);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(tag);
    request.onerror = () => reject(request.error);
  });
};


export const deleteTag = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject('Error deleting tag');
  });
};