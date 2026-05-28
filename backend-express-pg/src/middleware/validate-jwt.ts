import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { UserDetail, userSchema } from "../module/user/schema"

export const validateJwt =async (req: Request, res: Response, nextFunction:NextFunction)=>{
    try {
        const fullValue =req.headers.authorization // Bearer pri
        const token = fullValue?.replace("Bearere ", "")
        const decoded = await jwt.verify(token!, "pritam")
        console.log({decoded});
        const user  = await userSchema.parseAsync(decoded)
        console.log({user});

        req.user = user  as UserDetail
        nextFunction()
    } catch (error) {
        res.status(401).json({error: "No token"})
    }
}