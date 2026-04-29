import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../user/service";
import { User } from "../user/model.user";
import z, { email, ZodError } from "zod";
import jwt from "jsonwebtoken";
import { loginUserSchema } from "./schema";

export const registerUser = async (
    req: Request,
    res: Response,
    // nextFunction: NextFunction,
) => {
    try {
        const item: User = req.body
        const newItem = await createUser(item)
        res.status(201).json(newItem)
    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: z.prettifyError(error)
            })
        }
        if (error.errors) {
            return res.status(400).json({
                errors: error.errors
            })
        }
           return res.status(500).json({
                message: "Server error"
            })
    }
}

export const loginUser = async (
    req: Request,
    res: Response,
    // nextFunction: NextFunction,
) => {
    try {
        const validated = await loginUserSchema.parseAsync(req.body)
        const user = await getUserByEmail(validated.email)
        const token = jwt.sign({ email: user?.email }, "pritam", { expiresIn: "1d" })

        res.status(201).json({
            token
        })
    } catch (error: any) {
        console.log("error----------");
        console.log(error);
        
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: z.prettifyError(error)
            })
        }
        if (error.errors) {
            return res.status(400).json({
                errors: error.errors
            })
        }
              return res.status(500).json({
                message: "Server error"
            })
    }
}
