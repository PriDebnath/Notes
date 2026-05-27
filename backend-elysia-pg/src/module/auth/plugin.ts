import Elysia from "elysia";
import jwt from "@elysiajs/jwt";
import { UserDetail, userDetailSchema } from "../user/schema";


export const authPlugin = new Elysia({ name: "authPlugin" })
   .use(
      jwt({
         name: "jwt", // ctx.jwt
         secret: "super-secret-key",
      })
   )
   .derive({  as: "global"}, async ({ jwt, headers }) => {
      const token = headers.authorization?.replace('Bearer ', '')
      if (!token) {
         return { authUser: null };
      }
      try {
         const payload =  await jwt.verify(token)
         const userDetail = await userDetailSchema.parseAsync(payload)
         return { authUser: userDetail };
      } catch (error) {
         return { authUser: null };
      }
   })  