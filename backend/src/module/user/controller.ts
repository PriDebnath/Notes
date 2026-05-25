import Elysia from "elysia";
import { getUsers } from "./service";

const name = "users"
export const userController = new Elysia({prefix: name})
.get("/", async(req)=>{
    const users = getUsers()
    return users
},{
tags: [name]
})