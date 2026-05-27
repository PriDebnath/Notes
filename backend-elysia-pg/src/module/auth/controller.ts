import Elysia from "elysia"
import { signInSchema, signUpSchema } from "./schema"
import { createUser, getUser, getUserByEmail } from "../user/service"
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
        const { name, email, password } = req.body
         const existingUser = await getUserByEmail(email)
        if (existingUser) {
            req.set.status = 400
            throw new Error("User already present");
        }
        const passwordHash = await bcrypt.hash(password, 8)
        const user = await createUser({
            email,
            name,
            password: passwordHash,
        })
        return user
    }, {
        body: signUpSchema,
        tags: [authControllerPrifix]
    })