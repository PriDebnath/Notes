import { db } from "@/src/database/connection"
import { table } from "@/src/database/model"
import { CreateUser } from "./schema"
import { eq } from "drizzle-orm"

export const getUser = async (id:number) => {
    const user = await db.select().from(table.users).where(eq(table.users.id, id))
    return user
}

export const getUserByEmail = async (email:string) => {
    const [user] = await db.select().from(table.users).where(eq(table.users.email, email))
    return user
}

export const getUsers = async () => {
    const users = await db.select().from(table.users)
    return users
}

export const getUserQuotes = async () => {
    const userQuotes = await db.select()
        .from(table.quotes)
        .leftJoin(table.users, eq(table.quotes.user_id, table.users.id))
    return userQuotes
}

export const createUser = async (user: CreateUser) => {
    const newUser = await db.insert(table.users).values(user).returning()
    return newUser
}