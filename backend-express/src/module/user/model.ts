
import mongoose, { InferSchemaType, Schema, ObjectId } from "mongoose"


function normalizeEmail(email: string) {
    return email.trim().toLowerCase()
}

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            set: normalizeEmail,
            validate: {
                validator: (v: string) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
                message: "Invalid email format",
            },
        },
        password: { type: String, required: true },
    },
    { timestamps: true }
)

// 🔥 Real uniqueness enforcement
userSchema.index(
    { email: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
)

export const userModelName = "users"
export const userModel = mongoose.model(userModelName, userSchema)
export type User = InferSchemaType<typeof userSchema>