import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRECT } from "../utils/jwt";


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
            console.log({ decoded });
            nextFunction()
        } catch (error) {
            return res.status(401).json({ message: "Not authorized" });
        }
    }
    if (!token) {
        return res.status(401).json({ message: "No token" });
    }
}
