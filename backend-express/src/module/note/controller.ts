import { z, ZodError } from "zod"
import { Request, Response, } from "express"
import { noteUpdateZodSchema } from "./schema"
import { createNote, updateNote } from "./service"

export const syncNote = async (req: Request, res: Response) => {
    try {let newNote;
        if (req.body?._id) {
          newNote = await  updateNote(req.body)
        } else {
          newNote  =  await createNote(req.body, req.user)
        }
        res.status(200).json(newNote)
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