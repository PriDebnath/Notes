import { Elysia } from "elysia";
import { openapi } from '@elysiajs/openapi'
import { quote } from "@/src/module/quote/controller";

const app = new Elysia()
  .use(openapi())
  .get("/", () => "Hello Elysia")
  .use(quote)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
