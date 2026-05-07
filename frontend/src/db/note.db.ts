import type { Note } from "@/model/index.model";
import { db } from "@/db/db";

export const addNote = async (note: Note) => {
  const { id, ...data } = note;
  const generatedId = await db.notes.add({
    ...data,
    pinned: data.pinned ?? false,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return { ...note, id: generatedId };
};

export const updateNote = async (note: Note) => {
  if (!note.id) throw new Error("Note id required");

  await db.notes.update(note.id, {
    ...note,
    updated_at: new Date(),
  });

  return note;
};

export const toggleNotePinned = async (id: number, pinned: boolean) => {
  await db.notes.update(id, {
    pinned,
    updated_at: new Date(),
  });
}
