import { z } from "zod";
import type { User } from "./model";

export const userZodSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<User> ;

export const createUserSchema = userZodSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const userUpdateZodSchema  = userZodSchema.partial()