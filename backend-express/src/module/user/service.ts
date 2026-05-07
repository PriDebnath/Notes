import { User, userModel as Model } from "./model";
import { createUserSchema } from "./schema";
import { hash } from "bcryptjs";

export const createUser = async (item: User) => {
    const validated = await createUserSchema.parseAsync(item)
    const hashPassword = await hash(validated.password, 8)
    const newItem = await Model.create({
        ...validated,
        password: hashPassword
    })
    return newItem
}

export const getUserByEmail = async (email: string) => {
const item = await Model.findOne({ email })
return item;
}