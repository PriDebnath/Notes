import z from "zod"
import { users } from "./model"
import { InferInsertModel } from "drizzle-orm"

export type User = typeof users.$inferInsert

export type CreateUser = Pick<InferInsertModel<typeof users>, "first_name" | "last_name"|'email'>

export const createUserSchema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.email().min(1).max(200),
}) satisfies z.ZodType<CreateUser>