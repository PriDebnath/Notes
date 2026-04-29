import { z } from "zod";
import type { User } from "./model.user";

export const userZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<User> ;

export const createUserSchema = userZodSchema.omit({
  createdAt: true,
  updatedAt: true,
});