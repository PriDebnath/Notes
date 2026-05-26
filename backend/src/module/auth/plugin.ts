import Elysia from "elysia";
import jwt from "@elysiajs/jwt";
import { UserDetail } from "../user/schema";

export const authPlugin = new Elysia({ name: "auth" })
   .use(
      jwt({
         name: "jwt", // ctx.jwt
         secret: "super-secret-key",
      })
   )
   .derive(async ({ jwt, headers }) => {
      const token = headers.authorization?.replace('Bearer ', '')
      if (!token) {
         return { authUser: null };
      }
      try {
         const payload = jwt.verify(token)
         return { authUser: payload };
      } catch (error) {
         return { authUser: null };
      }
   })
   .decorate("authUser", null as null | UserDetail)
