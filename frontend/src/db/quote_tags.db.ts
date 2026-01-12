import { openDB, STORES } from "@/db/db";
import type { QuoteTags } from "@/model/quote.model";

const STORE_NAME = STORES.QUOTES_TAGS;
 
export const getAllQuoteTags = async (): Promise<QuoteTags[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error getting ' + STORE_NAME);
  });
};


export const addQuoteTag = async (quoteTag: QuoteTags): Promise<QuoteTags> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.put(quoteTag);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(quoteTag);
    transaction.onerror = () => reject('Error adding quote tag');
  });
};

export const updateQuoteTag = async (quoteTag: QuoteTags): Promise<QuoteTags> => {
  if (quoteTag.id == null) {
    throw new Error('Quote tag id is required for update');
  }

  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const request = store.put(quoteTag);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(quoteTag);
    request.onerror = () => reject(request.error);
  });
};


export const deleteQuoteTag = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject('Error deleting quote tag');
  });
};