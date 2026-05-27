import z from "zod"
import { users } from "./model"
import { InferInsertModel } from "drizzle-orm"

export type User = typeof users.$inferInsert

export type UserDetail = Omit<User, "password">

export type CreateUser = Pick<InferInsertModel<typeof users>, "name" | 'email' | "password">

export const createUserSchema = z.object({
  name: z.string().min(1).max(200).default("Pritam"),
  email: z.email().min(4).max(200).default("debnathpritam0802@gmail.com"),
  password: z.string().min(4, { message: "Min value is 4" }).max(200, { message: "Max value is 200" }).default("pppp")
}) satisfies z.ZodType<CreateUser>

export const userDetailSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(200),
  email: z.email().min(1).max(200),
  is_deleted: z.boolean(),
}) satisfies z.ZodType<UserDetail>