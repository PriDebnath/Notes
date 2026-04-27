import cors from "cors"
import express, { Express } from "express"
import swaggerUi from "swagger-ui-express"
import { swaggerUiApp } from "./utils/swagger-config";
import { router as routerUsers } from "./module/user/router.user";

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use("/docs", swaggerUi.serve, swaggerUiApp);

app.use("/users", routerUsers);

app.get("/", (req, res) => {
    res.send({ message: "🟩 Server is up and running" })
})

export { app }