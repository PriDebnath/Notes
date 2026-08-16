import { RequestUser } from "../module/user/schema"


declare global {
  namespace Express {
    interface Request {
      user?: RequestUser
    }
  }
}