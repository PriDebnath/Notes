import z from "zod";
import { Note } from "./model";

export const noteZodSchema = z.object({
         _id: z.string(),
         texture: z.string(),
         text: z.string(),
         pri_set: z.string(),
         pinned: z.boolean(),
         synced: z.boolean(),
           createdAt: z.date(),
           updatedAt: z.date(),
         user: z.string(),
}) satisfies z.infer<Note>

export const noteCreateZodSchema = noteZodSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
})

export const noteUpdateZodSchema = noteZodSchema.partial()