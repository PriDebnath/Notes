import { ObjectId } from "mongoose"
import { Request, Response } from "express"
import { userModel as Model, User as Type } from "./model.user"

export const createOne = async (req: Request, res: Response) => {
    const f: Type = req.body
    const item = await Model.create({
        ...f
    })
    await item.save()
    res.send(item)
}

export const getAll = async (req: Request, res: Response) => {
    const items = await Model.find()
    res.send(items)
}

export const getOne = async (req: Request, res: Response) => {
    const { _id } =req.params    
    const item = await Model.findById( _id)
    res.send(item)
}


export const updateOne = async (req: Request, res: Response) => {
    const f: Type = req.body
    const { _id } =req.params
    const item = await Model.findByIdAndUpdate(_id,{
        ...f
    })
    res.send(item)
}

export const deleteOne = async (req: Request, res: Response) => {
    const { _id } =req.params    
    const item = await Model.findByIdAndDelete( _id)
    res.send(item)
}

