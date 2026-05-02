import { Request, Response, NextFunction } from "express";
import { createUser, getUserByEmail } from "../user/service";
import { User } from "../user/model.user";
import z, { email, ZodError } from "zod";
import jwt from "jsonwebtoken";
import { loginUserSchema } from "./schema";
import { JWT_SECRECT } from "../../utils/jwt";

export const registerUser = async (
    req: Request,
    res: Response,
    // nextFunction: NextFunction,
) => {
    try {
        const item: User = req.body
        const user = await getUserByEmail(item.email)
        if (user) {
            return res.status(400).json({
                message: "User already present"
            })
        }

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
        const token = jwt.sign({
            email: user?.email,
            _id: user?._id,
            name: user?.name,
        },
            JWT_SECRECT,
            { expiresIn: "1d" }
        )

        res.status(201).json({
            token
        })
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
