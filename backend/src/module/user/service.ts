import { db } from "@/src/database/connection"
import { table } from "@/src/database/model"
import { CreateUser } from "./schema"


export const getUsers = async ()=>{
    const users = await db.select().from(table.users)
    return users
}

export const createUser = async (user: CreateUser) => {
    const newUser = await db.insert(table.users).values(user).returning()
    return newUser
}