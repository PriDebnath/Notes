import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRECT } from "../utils/jwt";
import { userPayloadSchema } from "../module/auth/schema";
import { httpRequestDuration } from "../utils/app-metric";


export const appMetric = async (
    req: Request,
    res: Response,
    nextFunction: NextFunction,
) => {
  const start = Date.now()
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000

    httpRequestDuration
      .labels(req.method, req.route?.path || req.url, res.statusCode.toString())
      .observe(duration)
  })
  nextFunction()
}
