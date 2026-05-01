import { JwtPayload } from "jsonwebtoken";
import { userPayloadSchema } from "../module/auth/schema";

type RequestUser = z.infer<typeof userPayloadSchema>;

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser
    }
  }
}