import { eq } from "drizzle-orm";
import { db } from "../../database/connection";
import { table } from "../../database/model";
import { CreateUser } from "./schema";
import bcryptjs from "bcryptjs";

export const createUser = async (param: CreateUser) => {
    const hashedPassword = await bcryptjs.hash(param.password, 8)
    const [newUser] = await db.insert(table.users)
        .values({
            ...param,
            password: hashedPassword
        })
        .returning()
    const { password, ...user } = newUser
    return user
}

export const getUserByEmail = async (email: string) => {
    const [existingUser] = await db.select()
        .from(table.users)
        .where(eq(table.users.email, email))
    return existingUser
}
