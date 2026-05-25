import { db } from "@/src/database/connection"
import { table } from "@/src/database/model"


export const getUsers = async ()=>{
    const users = await db.select().from(table.users)
    return users
}