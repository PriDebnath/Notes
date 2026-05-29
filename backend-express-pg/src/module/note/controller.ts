import { errorHandler } from "../../../src/utils/error-handler"
import { Request, Response } from "express"
import { createNoteScema } from "./schema"
import { createNote } from "./service"

export const addNoteController = async (req: Request, res: Response)=>{
    try {
        const user = req.user
        const param = await createNoteScema.parseAsync({
            ...req.body,
            user_id: user?.id,
        })
        const newItem = await createNote(param)
        res.status(201).json(newItem)
    } catch (error) {
        errorHandler({response: res, error})
    }
}