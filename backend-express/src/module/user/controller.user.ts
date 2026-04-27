import { Request, Response } from "express"
import { userModel as Model, User as Type } from "./model.user"

export const getAll = async (req: Request, res: Response) => {
    const items = await Model.find()
    res.send(items)
}

export const createOne = async (req: Request, res: Response) => {
    const f: Type = req.body
    const item = await Model.create({
        ...f
    })
    await item.save()
    res.send(item)
}