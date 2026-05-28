import { UserDetail } from "../module/user/schema"

export type RequestUser = UserDetail

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser
    }
  }
}