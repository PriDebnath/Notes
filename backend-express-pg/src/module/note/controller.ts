import { errorHandler } from "../../../src/utils/error-handler"
import { Request, Response } from "express"
import { createNoteScema, updateNoteScema } from "./schema"
import { createNote, deleteNote, getNote, getNotes, updateNote } from "./service"

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


export const updateNoteController = async (req: Request, res: Response)=>{
    try {
        const user = req.user
        const { id} = req.params
        const param = await updateNoteScema.parseAsync({
            ...req.body,
            id: Number(id),
            user_id: user?.id,
        })
        const newItem = await updateNote(param)
        res.status(200).json(newItem)
    } catch (error) {
        errorHandler({response: res, error})
    }
}

export const getNotesController = async (req: Request, res: Response)=>{
    try {
        const items = await getNotes()
        res.status(200).json(items)
    } catch (error) {
        errorHandler({response: res, error})
    }
}

export const getNoteController = async (req: Request, res: Response)=>{
    try {
        const { id} = req.params
        const items = await getNote(Number(id))
        res.status(200).json(items)
    } catch (error) {
        errorHandler({response: res, error})
    }
}

export const deleteNoteController = async (req: Request, res: Response)=>{
    try {
        const { id} = req.params
        const items = await deleteNote(Number(id))
        res.status(200).json(items)
    } catch (error) {
        errorHandler({response: res, error})
    }
}
