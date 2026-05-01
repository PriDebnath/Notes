import { z, ZodError } from "zod"
import { Request, Response, } from "express"
import { noteUpdateZodSchema } from "./schema"
import { createNote, getNote, updateNote } from "./service"

export const syncNote = async (req: Request, res: Response) => {
    const existingNote = await getNote(req?.body?._id)
    try {
        let newNote;
        if (existingNote) {
          newNote = await  updateNote(req.body)
        } else {
          newNote  =  await createNote(req.body, req.user)
        }
        console.log(
            {newNote}
        );
        
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