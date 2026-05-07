import { z, ZodError } from "zod"
import { Request, Response, } from "express"
import { noteUpdateZodSchema } from "./schema"
import { errorHandler } from "../../utils/error-handler"
import { createNote, getNote, updateNote, getNoteByUser, deleteNoteById } from "./service"

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
        errorHandler({ error, response: res })
    }
}

export const getAllNote = async (req: Request, res: Response) => {
    try {
        const data = await getNoteByUser(req.user?._id)
        res.status(200).json(data)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}



export const getNoteController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const existingNote = await getNote(_id.toString())
        res.status(200).json(existingNote)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}

export const updateNoteController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const existingNote = await getNote(_id.toString())
        if (!existingNote) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        const data = await updateNote({
            ...req.body,
            _id
        })
        res.status(200).json(data)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}


export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const data = await deleteNoteById(_id.toString())
        res.status(200).json(data)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}
