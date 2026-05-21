import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRECT } from "../utils/jwt";
import { userPayloadSchema } from "../module/auth/schema";
import { httpRequestDuration } from "../utils/config/app-metric.config";


export const appMetric = async (
    req: Request,
    res: Response,
    nextFunction: NextFunction,
) => {
  const start = Date.now()
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000
  const route =
    req.route?.path ||
    req.originalUrl?.split("?")[0] ||
    "unknown";
    httpRequestDuration
      .labels(req.method, route, res.statusCode.toString())
      .observe(duration)
  }) 
  nextFunction()
}
