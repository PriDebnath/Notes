

import z from "zod"
import { notes } from "../../module/note/model"


export type CreateNote = typeof notes.$inferInsert

export const createNoteScema = z.object({
    text: z.string(),
    user_id: z.number()
}) satisfies z.ZodType<CreateNote>

