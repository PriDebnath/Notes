import { openDB, STORES } from "./db";
import type { Quote } from "@/model/index.model";

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


export const addQuote = async (quote: Quote): Promise<Quote> => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const promise = new Promise<Quote>((resolve, reject) => {
    // IMPORTANT: remove id before add
    const { id, ...data } = quote;
    const req = store.add({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    req.onsuccess = () => {
      resolve({
        ...quote,
        id: req.result as number, // ✅ GENERATED ID
      });
    };
    req.onerror = () => reject(req.error);
  });

  return promise
};



export const updateQuote = async (quote: Quote): Promise<Quote> => {
  if (quote.id == null) {
    throw new Error('Quote id is required for update');
  }

  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const promise = new Promise<Quote>(async (resolve, reject) => {
    const req = store.put({
      ...quote,
      updated_at: new Date(),
    })
    req.onsuccess = async () => {
      resolve({
        ...quote,
      })
    }
    req.onerror = () => reject(req.error)
  })

  return promise
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