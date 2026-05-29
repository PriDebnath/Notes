

import z from "zod"
import { notes } from "../../module/note/model"


export type CreateNote = typeof notes.$inferInsert

export interface UpdateNote extends Partial<typeof notes.$inferSelect>{
    id: number;
    user_id: number;
}

export const createNoteScema = z.object({
    text: z.string(),
    user_id: z.number()
}) satisfies z.ZodType<CreateNote>

export const updateNoteScema = z.object({
    id: z.number(),
    text: z.string().optional(),
    user_id: z.number(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
    deleted_at: z.date().optional(),
    is_deleted: z.boolean().optional(),
}) satisfies z.ZodType<UpdateNote>