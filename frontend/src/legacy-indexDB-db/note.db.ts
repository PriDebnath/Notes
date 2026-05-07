import { openDB, STORES } from "./db";
import type { Note } from "@/model/index.model";

const STORE_NAME = STORES.NOTES;

export const getAllNotes = async (): Promise<Note[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error getting ' + STORE_NAME);
  });
};

export const getAllNote = async (noteId: number): Promise<Note> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(noteId);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error getting ' + STORE_NAME);
  });
};


export const addNote = async (note: Note): Promise<Note> => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const promise = new Promise<Note>((resolve, reject) => {
    // IMPORTANT: remove id before add
    const { id, ...data } = note;
    const req = store.add({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    req.onsuccess = () => {
      resolve({
        ...note,
        id: req.result as number, // ✅ GENERATED ID
      });
    };
    req.onerror = () => reject(req.error);
  });

  return promise
};



export const updateNote = async (note: Note): Promise<Note> => {
  if (note.id == null) {
    throw new Error('Note id is required for update');
  }

  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const promise = new Promise<Note>(async (resolve, reject) => {
    const req = store.put({
      ...note,
      updated_at: new Date(),
    })
    req.onsuccess = async () => {
      resolve({
        ...note,
      })
    }
    req.onerror = () => reject(req.error)
  })

  return promise
};


export const deleteNote = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject('Error deleting note');
  });
};