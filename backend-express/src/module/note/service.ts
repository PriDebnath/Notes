import z from "zod"
import { noteCreateZodSchema , noteUpdateZodSchema} from "./schema"
import { NoteModel } from "./model"
import { User } from "../user/model.user"
import { userPayloadSchema } from "../auth/schema"

export const createNote = async (
    param: z.infer<typeof noteCreateZodSchema>, 
    user: z.infer<typeof userPayloadSchema>
) => {
    const validated = await noteCreateZodSchema.parseAsync({
        ...param,
        user: user._id
    })
    const newData = await NoteModel.create({
        ...validated,
        synced: true,
    })
    return newData
}

export const updateNote = async (param: z.infer<typeof noteUpdateZodSchema>) => {
    const validated = await noteUpdateZodSchema.parseAsync(param)
    const { texture, pinned, pri_set, text} = validated
    const newData = await NoteModel.findByIdAndUpdate(validated?._id,{
        ...(texture && ({ texture: validated.texture})),
        ...(pinned && ({ pinned: validated.pinned})),
        ...(pri_set && ({ pri_set: validated.pri_set})),
        ...(text && ({ text: validated.text})),
        synced: true
    })
    return newData
}