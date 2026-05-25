import Elysia from "elysia";
import { createUser, getUsers } from "./service";
import { createUserSchema } from "./schema";

const name = "users"
export const userController = new Elysia({ prefix: name })
    .get("/", async (req) => {
        const users = getUsers()
        return users
    }, {
        tags: [name]
    })
    .post("/", async (req) => {
        const body = req.body
        const user = await createUser(body)
        return user
    }, {
        tags: [name],
        body: createUserSchema
    })