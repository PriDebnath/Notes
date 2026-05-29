import { db } from "../../database/connection";
import { table } from "../../database/model";
import { CreateNote } from "./schema";

export const createNote = async (param: CreateNote)=>{
    const [item] = await db.insert(table.notes).values(param).returning()
    return item
}