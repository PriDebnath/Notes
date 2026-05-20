import { JwtPayload } from "jsonwebtoken";
import { userPayloadSchema } from "../module/auth/schema";

export type RequestUser = z.infer<typeof userPayloadSchema>;

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser
    }
  }
}