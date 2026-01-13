import { openDB, STORES } from "@/db/db";
import type { Quote } from "@/model/quote.model";

const STORE_NAME = STORES.QUOTES;
 
export const getAllQuotes = async (): Promise<Quote[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error getting ' + STORE_NAME);
  });
};

export const getAllQuote = async (quoteId: number): Promise<Quote> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(quoteId);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error getting ' + STORE_NAME);
  });
};


export const addQuote = async (
  quote: Omit<Quote, 'id'>
): Promise<Quote> => {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)

  return new Promise((resolve, reject) => {
    const req = store.add({
      text: quote.text,
    })

    req.onsuccess = () =>
      resolve({ id: req.result as number, ...quote })

    req.onerror = () => reject(req.error)
  })
}


export const updateQuote = async (quote: Quote): Promise<Quote> => {
  if (quote.id == null) {
    throw new Error('Quote id is required for update');
  }

  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const request = store.put(quote);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(quote);
    request.onerror = () => reject(request.error);
  });
};


export const deleteQuote = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject('Error deleting quote');
  });
};