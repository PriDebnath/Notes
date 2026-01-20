import { openDB, STORES } from "./db";
import type { Tag } from "@/model/index.model";

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

export const getTag = async (tagId: number): Promise<Tag> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(tagId)
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error getting ' + STORE_NAME);
  });
};


export const addTag = async (tag: Tag): Promise<Tag> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const newTag: Tag = {
    name: tag.name,
  };
  store.put(newTag);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(tag);
    transaction.onerror = () => reject('Error adding tag');
  });
};

export const addOrGetTag = async (tag: Tag): Promise<Tag> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const index = store.index('name');

  const request = index.get(tag.name);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      // ✅ tag already exists
      if (request.result) {
        resolve(request.result);
        return;
      }

      // ❌ tag does not exist → create
      const newTag: Omit<Tag, 'id'> = {
        name: tag.name,
      };

      const addRequest = store.add(newTag);

      addRequest.onsuccess = () => {
        // Ensure we return the tag with the generated id
        resolve({
          id: addRequest.result as number,
          name: newTag.name,
        });
      };
      addRequest.onerror = () => reject('Error adding tag');
    };

    request.onerror = () => reject('Error getting ' + STORE_NAME);
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