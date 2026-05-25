import z, { email } from "zod";
import { createUserSchema } from "../user/schema";


export const signInSchema = z.object({
    email : email(),
    password : z.string().min(4,{message: "Min value is 4"}).max(20,{message:"Max value is 20"})
})

export const signUpSchema = createUserSchema.extend({
    password : z.string().min(4,{message: "Min value is 4"}).max(20,{message:"Max value is 20"})
})