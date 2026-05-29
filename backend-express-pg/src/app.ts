import cors from "cors"
// import helmet from "helmet"
import swaggerUi from "swagger-ui-express"
import express, { Express,  } from "express"
import { logger } from "./utils/config/logger.config";
import { router as routerAuth } from "./module/auth/router";
import { router as routerNote } from "./module/note/router";
// import { register } from "./utils/config/app-metric.config";
import { swaggerUiApp } from "./utils/config/swagger.config";
// import { router as routerUsers } from "./module/user/router";
// import { appMetric } from "./middleware/app-metric.middleware";
import {  rateLimit } from "./utils/config/rate-limiter.config";
import { validateJwt } from "./middleware/validate-jwt";
// import { router as routerPractice} from "./module/practice/router";
// import { dashboardPath, serverAdapter } from "./utils/config/worker-dashboard.config";

const app: Express = express()

app.use(cors( ))
// app.use(helmet( ))
// app.use(appMetric)
app.use(express.json({ strict: false,limit:"10kb" }));
app.use(logger);
app.use(rateLimit);

 // custom middleware 
// app.use(validateJwt);// can apply at globally 


////  Swagger for API docs
app.use("/docs", swaggerUi.serve, swaggerUiApp);

// Worker dashboard
  // app.use(dashboardPath, serverAdapter.getRouter());

// Metric
// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", register.contentType)
//   res.end(await register.metrics())
// })

// Routers
// app.use("/api/v1/users", routerUsers);
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/notes", routerNote);
// app.use("/api/v1/practice", routerPractice);

app.get("/", (req, res) => {
    res.send({ message: "🟩 Server is up and running" })
})

export default app  