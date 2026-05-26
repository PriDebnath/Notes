import Elysia from "elysia"
import { signInSchema, signUpSchema } from "./schema"
import { getUser, getUserByEmail } from "../user/service"
import bcrypt from "bcrypt"
import { authPlugin } from "./plugin"
import { userDetailSchema } from "../user/schema"

export const authControllerPrifix = "/auth"
export const authController = new Elysia({ prefix: authControllerPrifix })
    .use(authPlugin)
    .post("sign-in", async (request) => {
        const { body, jwt, authUser } = request
        const errorMessage = "Invalid credentials"
        const user = await getUserByEmail(body.email)
        if (user) {
            const passwordMatched = await bcrypt.compare(body.password, user.password)
            if (passwordMatched) {
                const userParsed = await userDetailSchema.parseAsync(user)
                const token = await jwt.sign(userParsed)
                return { token }
            } else {
                throw new Error(errorMessage);
            }
        } else {
            throw new Error(errorMessage);
        }
    }, {
        body: signInSchema,
        tags: [authControllerPrifix]
    })
    .post("sign-up", async (req) => {
const {  } = req.body
    }, {
        body: signUpSchema,
        tags: [authControllerPrifix]
    })