
import mongoose, { InferSchemaType, Schema, } from "mongoose"

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    password: { type: String, required: true }
},
    { timestamps: true }
)

export const userModelName  = "users"
export const userModel  = mongoose.model(userModelName, userSchema)
export type User = InferSchemaType<typeof userSchema>