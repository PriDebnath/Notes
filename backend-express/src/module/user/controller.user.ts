import { ObjectId } from "mongoose"
import { Request, Response } from "express"
import { userModel as Model, User as Type } from "./model.user"
import { createUser } from "./service"

export const createOne = async (req: Request, res: Response) => {
         const item: Type = req.body
    const newItem = await createUser(item)
    res.send(newItem)   
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
    console.log({_id});
    
    const item = await Model.findByIdAndUpdate(_id,{
        ...f
    })
    console.log({item});
    res.send(item)
}

export const deleteOne = async (req: Request, res: Response) => {
    const { _id } =req.params    
    const item = await Model.findByIdAndDelete( _id)
    res.send(item)
}

