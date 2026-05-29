
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response} from "express"
import { errorHandler } from "../../utils/error-handler"
import { createUserShema, userSignInSchema } from "../user/schema"
import { createUser ,getUserByEmail} from "../user/service"
import { JWT_KEY } from "../../utils/jwt"

export const signUpController = async (req: Request, res:Response)=>{
    try {
        const data = await createUserShema.parseAsync(req.body)
        const existingUser = await getUserByEmail(data.email)
        if (existingUser) {
            res.status(400).send("User already exists")
        }
        const newUser = await createUser(data)
        res.status(201).json(newUser)
    } catch (error) {        
        errorHandler({ response: res, error})
    }
}

export const signInController = async (req: Request, res:Response)=>{
    const errorMessage = "Invalid creds"
    try {
        const data = await userSignInSchema.parseAsync(req.body)
        const existingUser = await getUserByEmail(data.email)
        if (existingUser) {
            const passwordMatched = await bcryptjs.compare(data.password, existingUser.password)
        if (passwordMatched) {
            const {password, ...user} = existingUser
            const token = jwt.sign(user, JWT_KEY,{expiresIn: 60 * 1000})
            res.status(200).json({token})
        }else{
            res.status(400).send(errorMessage)
        }
        }else{
            res.status(400).send(errorMessage)
        }
    } catch (error) {        
        errorHandler({ response: res, error})
    }
}