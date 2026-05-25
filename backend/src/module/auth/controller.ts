import Elysia from "elysia"
import { signInSchema, signUpSchema } from "./schema"


const name = "Auth"
export const authController = new Elysia({ prefix: name })
    .post("sign-in", async (req) => {

    }, {
        body: signInSchema
    })
    .post("sign-up", async (req) => {

    }, {
        body: signUpSchema
    })