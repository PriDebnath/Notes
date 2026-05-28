import { errorHandler } from "../../../src/utils/error-handler"
import { Request, Response } from "express"

export const addNoteController = async (req: Request, res: Response)=>{
    try {
        res.json({yo:"boi"})
        
    } catch (error) {
        errorHandler({response: res, error})
    }
}