import z from "zod";
import { users } from "./model";


export const userFullSchema = z.object({
    id: z.number(),
    email: z.email(),
    created_at: z.date(),
    is_deleted: z.boolean(),
    name: z.string(),
    password: z.string(),
    updated_at: z.date(),
}) satisfies z.ZodType<typeof users.$inferSelect>


export const createUserShema = z.object({
    email: z.email(),
    name: z.string(),
    password: z.string(),
}) satisfies z.ZodType<typeof users.$inferInsert>

export const userSignInSchema = createUserShema.omit({
    name: true
})

export type  UserSignIn =z.infer <typeof userSignInSchema>


export type CreateUser = typeof users.$inferInsert

export const userSchema = userFullSchema.omit({
    password: true
})

export type  UserDetail =z.infer <typeof userSchema>

export const requestUserSchema = userSchema.omit({
    created_at: true,
    updated_at: true,
    is_deleted: true,
})

export type  RequestUser = z.infer <typeof requestUserSchema>