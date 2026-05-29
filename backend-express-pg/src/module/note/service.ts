import { eq } from "drizzle-orm";
import { db } from "../../database/connection";
import { table } from "../../database/model";
import { CreateNote, UpdateNote } from "./schema";

export const getNote = async (id: number) => {
    const [item] = await db.select()
        .from(table.notes)
        .where(eq(table.notes.id, id))
    return item
}

export const getNotes = async () => {
    const items = await db.select()
        .from(table.notes)
    return items
}


export const createNote = async (param: CreateNote) => {
    const [item] = await db.insert(table.notes).values(param).returning()
    return item
}

export const updateNote = async (param: UpdateNote) => {
    const { id, ...rest } = param
    const [item] = await db.update(table.notes)
        .set({ ...rest })
        .where(eq(table.notes.id, id))
        .returning()
    return item
}