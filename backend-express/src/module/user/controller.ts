import { ObjectId } from "mongoose"
import { createUser } from "./service"
import { Request, Response } from "express"
import { errorHandler } from "../../utils/error-handler"
import { userModel as Model, User as Type } from "./model"

export const createOne = async (req: Request, res: Response) => {
    try {
        const item: Type = req.body
        const newItem = await createUser(item)
        res.send(newItem)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const items = await Model.find()
        res.send(items)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const item = await Model.findById(_id)
        res.send(item)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}


export const updateOne = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const item = await Model.findByIdAndUpdate(_id, {
            ...req.body
        })
        res.send(item)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const item = await Model.findByIdAndDelete(_id)
        res.send(item)
    } catch (error: any) {
        errorHandler({ error, response: res })
    }
}

