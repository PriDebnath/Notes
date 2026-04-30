import cors from "cors"
import express, { Express,  } from "express"
import swaggerUi from "swagger-ui-express"
import { swaggerUiApp } from "./utils/swagger-config";
import { router as routerUsers } from "./module/user/router.user";
import { router as routerAuth } from "./module/auth/router";

const app: Express = express()

app.use(cors( ))
app.use(express.json({ strict: false }));

 // Swagger for API docs
app.use("/docs", swaggerUi.serve, swaggerUiApp);

// Routers
app.use("/api/v1/users", routerUsers);
app.use("/api/v1/auth", routerAuth);

app.get("/", (req, res) => {
    res.send({ message: "🟩 Server is up and running" })
})

export default app  