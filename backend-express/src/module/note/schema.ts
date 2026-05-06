import z from "zod";
import { Note } from "./model";

export const noteZodSchema = z.object({
  _id: z.string(),
  id: z.number().optional(), // will come from local 
  texture: z.string().optional(),
  text: z.string(),
  pri_set: z.string().optional(),
  pinned: z.boolean(),
  synced: z.boolean(),
  shared: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.string().optional(),
}) satisfies z.infer<Note>

export const noteCreateZodSchema = noteZodSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
})

export const noteUpdateZodSchema = noteZodSchema.partial()