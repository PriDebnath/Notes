import cors from "cors"
import helmet from "helmet"
import express, { Express,  } from "express"
import swaggerUi from "swagger-ui-express"
import {  rateLimit } from "./utils/config/rate-limiter.config";
import { swaggerUiApp } from "./utils/config/swagger.config";
import { router as routerAuth } from "./module/auth/router";
import { router as routerNote } from "./module/note/router";
import { router as routerUsers } from "./module/user/router";
import { router as routerPractice} from "./module/practice/router";
import { logger } from "./utils/config/logger.config";

const app: Express = express()

app.use(cors( ))
app.use(helmet( ))
app.use(express.json({ strict: false,limit:"10kb" }));

app.use(rateLimit);

app.use(logger);

 // Swagger for API docs
app.use("/docs", swaggerUi.serve, swaggerUiApp);

// Routers
app.use("/api/v1/users", routerUsers);
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/notes", routerNote);
app.use("/api/v1/practice", routerPractice);

app.get("/", (req, res) => {
    res.send({ message: "🟩 Server is up and running" })
})

export default app  