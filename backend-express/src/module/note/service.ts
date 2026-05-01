import z from "zod"
import { noteCreateZodSchema, noteUpdateZodSchema } from "./schema"
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
    const { _id, texture, pinned, pri_set, text } = validated
    console.log(
        { validated }
    );

    const newData = await NoteModel.findByIdAndUpdate(_id, {
        ...(texture && ({ texture: validated.texture })),
        ...(pinned && ({ pinned: validated.pinned })),
        ...(pri_set && ({ pri_set: validated.pri_set })),
        ...(text && ({ text: validated.text })),
        synced: true
    },
        { new: true}
    )
    console.log({ newData });

    return newData
}


export const getNote = async (_id: string ) => {
    const data = await NoteModel.findById(_id)
    return data
}


export const getNoteByUser = async (user_id: string ) => {
    const data = await NoteModel.find({
        user:user_id
    })
    return data
}

export const getAllNote = async ( ) => {
    const data = await NoteModel.find()
    return data
}