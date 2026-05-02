import { z, ZodError } from "zod"
import { Request, Response, } from "express"
import { noteUpdateZodSchema } from "./schema"
import { createNote, getNote, updateNote, getNoteByUser, deleteNoteById} from "./service"

export const syncNote = async (req: Request, res: Response) => {
    const existingNote = await getNote(req?.body?._id)
    try {
        let newNote;
        if (existingNote) {
            newNote = await updateNote(req.body)
        } else {
            newNote = await createNote(req.body, req.user)
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

export const getAllNote = async (req: Request, res: Response) => {
    try {
        const data = await getNoteByUser(req.user?._id)
        res.status(200).json(data)
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

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const data = await deleteNoteById(_id.toString())
        res.status(200).json(data)
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
