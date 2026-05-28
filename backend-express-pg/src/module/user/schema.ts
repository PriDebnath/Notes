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


export const userSchema = userFullSchema.omit({
    password: true
})

export type  UserDetail =z.infer <typeof userSchema>