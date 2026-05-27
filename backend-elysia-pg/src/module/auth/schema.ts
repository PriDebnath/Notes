import z, { email } from "zod";
import { createUserSchema } from "../user/schema";


export const signInSchema = z.object({
    email : email().default("debnathpritam0802@gmail.com"),
    password : z.string().min(4,{message: "Min value is 4"}).max(20,{message:"Max value is 20"}).default("pppp")
})

export const signUpSchema = createUserSchema.extend({
})