import cors from "cors"
import express, { Express,  } from "express"
import swaggerUi from "swagger-ui-express"
import {  rateLimit } from "./utils/config/rate-limiter-config";
import { swaggerUiApp } from "./utils/config/swagger-config";
import { router as routerAuth } from "./module/auth/router";
import { router as routerNote } from "./module/note/router";
import { router as routerUsers } from "./module/user/router";

const app: Express = express()

app.use(cors( ))
app.use(express.json({ strict: false }));

app.use(rateLimit);

 // Swagger for API docs
app.use("/docs", swaggerUi.serve, swaggerUiApp);

// Routers
app.use("/api/v1/users", routerUsers);
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/notes", routerNote);

app.get("/", (req, res) => {
    res.send({ message: "🟩 Server is up and running" })
})

export default app  