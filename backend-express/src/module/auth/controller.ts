import { Request, Response, NextFunction } from "express";
import { createUser } from "../user/service";
import { User } from "../user/model.user";
import z, { ZodError } from "zod";

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
    }
}

