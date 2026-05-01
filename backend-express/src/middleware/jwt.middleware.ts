import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRECT } from "../utils/jwt";
import { userPayloadSchema } from "../module/auth/schema";


export const validatedJwtToken = async (
    req: Request,
    res: Response,
    nextFunction: NextFunction,
) => {
    let token;
    const hasToken = req.headers.authorization?.startsWith("Bearer")
    if (hasToken) {
        try {
            const full = req.headers.authorization
            token = full?.split(" ")[1]

            if (!token) {
                return res.status(401).json({ message: "No token" });
            }
            const decoded = jwt.verify(token, JWT_SECRECT)
            const user = await userPayloadSchema.parseAsync(decoded)
            // console.log({ decoded, user });
            req.user = user
            nextFunction()
        } catch (error) {
            return res.status(401).json({ message: "Not authorized" });
        }
    }
    if (!token) {
        return res.status(401).json({ message: "No token" });
    }
}
