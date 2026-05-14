import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { errorHandler } from "../utils/error-handler";

type Source = "body" | "params" | "query"

export const validateZodSchema = (schema: ZodSchema, source: Source) => {
    const middleware = async (req: Request, res: Response, nextFunction: NextFunction) => {
        try {
            const validated = await schema.parseAsync(req[source])
            req[source] = validated
            nextFunction()
        } catch (error: any) {
            errorHandler({ response: res, error })
        }
    }
    return middleware
}