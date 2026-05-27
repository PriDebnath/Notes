import "dotenv/config"
import "@/src/utils/env" // load environment variables and match with zod schema defined in env.ts
import { Elysia } from "elysia";
import { sql } from "drizzle-orm";
import { db } from "@/src/database/connection";
import { openapi } from "@elysiajs/openapi";
import { quoteController } from "@/src/module/quote/controller";
import { logger } from "@/src/utils/logger";
import { userController } from "./module/user/controller";
import { authController, authControllerPrifix } from "./module/auth/controller";
import { authPlugin } from "./module/auth/plugin";

export const docControllerPrifix = "/docs"

const app = new Elysia()
  .use(authPlugin)
 .guard({
    beforeHandle(request) {
      // console.log({ p: request.path });
      const path = request.path
      if (
        path.startsWith(authControllerPrifix)
        || path.startsWith(docControllerPrifix)
      ) {
        return
      } else {
        const authUser = request?.authUser
        if (!authUser) {
          request.set.status = 401
          throw new Error('Unauthorized')
        }
      }
    }
  })
  .use(authController)
  .use(quoteController)
  .use(userController)
  .use(openapi({ path: docControllerPrifix })) // Hit '/openapi'

  // Basic per-request logging
  .onRequest(({ request }) => {
    logger.info(
      {
        method: request.method,
        url: request.url,
      },
      "Incoming request",
    );
  })
  .onError(({ error }) => {
    logger.error(error, "Error");
  })
  .onAfterResponse((response) => {
    logger.info({
      response,
      status: response.set.status,
    }, "After response");
  })
  .get("/", () => "Hello Elysia")
  .group("/health", (app) => {
    return app
      .get("/", () => {
        return {
          status: "ok"
        }
      }, {
        detail: {
          summary: "Check server health",
          description: "Check server health",
          tags: ["health"],
        }
      })
      .get("/db", async () => {
        const res = await db.execute(sql`select 1`)
        logger.info("🟩 Database connected successfully")
        return {
          status: "ok",
          res
        }
      }, {
        detail: {
          summary: "Check database connection",
          description: "Check database connection",
          tags: ["health"],
        }
      })
  })
  .listen(3000);

logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
