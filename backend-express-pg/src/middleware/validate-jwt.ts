import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { requestUserSchema, UserDetail, userSchema } from "../module/user/schema"
import { JWT_KEY } from "../utils/jwt"

export const validateJwt =async (req: Request, res: Response, nextFunction:NextFunction)=>{
    try {
        const fullValue =req.headers.authorization // Bearer pri
        const token = fullValue?.replace("Bearer ", "")
        const decoded =  jwt.verify(token!, JWT_KEY)
        const user  = await  requestUserSchema.parseAsync(decoded)
        req.user = user  as UserDetail
        nextFunction()
    } catch (error) {        
        res.status(401).json({error: "No token"})
    }
}