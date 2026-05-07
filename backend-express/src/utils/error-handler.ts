import z, { ZodError } from "zod"
import { Response } from "express"

export const errorHandler = (param: {
    error: any,
    response: Response,
}) => {
    const { error, response } = param
    
    if (error instanceof ZodError) {
        return response.status(400).json({
            message: z.prettifyError(error)
        })
    }

    //  Mongoose CastError (INVALID ObjectId)
    if (error?.name === "CastError") {
        return response.status(400).json({
            message: `Invalid ${error.path}: ${error.value}`
        })
    }

    //  Mongoose validation errors
    if (error.errors) {
        return response.status(400).json({
            errors: error.errors
        })
    }

    return response.status(500).json({
        message: "Server error"
    })
}