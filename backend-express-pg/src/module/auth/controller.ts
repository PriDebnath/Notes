
import { Request, Response} from "express"
import { errorHandler } from "../../utils/error-handler"
import { createUserShema } from "../user/schema"
import { createUser ,getUserByEmail} from "../user/service"

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