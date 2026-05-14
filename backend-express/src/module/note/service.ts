import z from "zod"
import { noteCreateZodSchema, noteUpdateZodSchema } from "./schema"
import { NoteModel } from "./model"
import { User } from "../user/model"
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
    const { _id, texture, pinned, shared, pri_set, text, id } = validated
    let updatePayload: typeof validated = {}
    if (texture !== undefined) updatePayload.texture = texture
    if (pinned !== undefined) updatePayload.pinned = pinned
    if (pri_set !== undefined) updatePayload.pri_set = pri_set
    if (text !== undefined) updatePayload.text = text
    if (id !== undefined) updatePayload.id = id
    if (shared !== undefined) updatePayload.shared = shared
    updatePayload.synced = true

    const newData = await NoteModel.findByIdAndUpdate(_id, updatePayload,
        { returnDocument: "after" }
    )

    return newData
}


export const getNote = async (_id: string) => {
    const data = await NoteModel.findById(_id)
    return data
}


export const getNoteByUser = async (user_id: string) => {
    const data = await NoteModel.find({
        user: user_id
    })
    return data
}

export const getAllNote = async () => {
    const data = await NoteModel.find()
    return data
}

export const getPaginatedNote = async ({ page = 1, limit = 10 }: { page: number; limit: number }) => {
    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
        NoteModel.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        NoteModel.countDocuments(),
    ])
    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    }
}

export const deleteNoteById = async (_id: string) => {
    const data = await NoteModel.findByIdAndDelete(_id)
    return data
}