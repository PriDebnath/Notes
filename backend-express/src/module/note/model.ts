
import mongoose, { InferSchemaType, Schema, ObjectId } from "mongoose"
import { userModelName } from "../user/model.user"

const noteSchema = new Schema(
    {
        texture: { type: Schema.Types.String, required: false },
        text: { type: Schema.Types.String, required: true },
        pri_set: { type: Schema.Types.String, required: false },
        pinned: { type: Schema.Types.Boolean, required: false  },
        synced: { type: Schema.Types.Boolean, required: false  },
        user: { type: Schema.Types.ObjectId,  ref: userModelName},
    },
    { timestamps: true }
)

export const noteModelName = "notes"
export const NoteModel = mongoose.model(noteModelName, noteSchema)
export type Note = InferSchemaType<typeof noteSchema>

