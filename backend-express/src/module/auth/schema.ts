import { userZodSchema } from "../user/schema";

export const loginUserSchema = userZodSchema.omit({
  createdAt: true,
  updatedAt: true,
  name: true
});

export const userPayloadSchema = userZodSchema.omit({
  createdAt: true,
  updatedAt: true,
  password: true
});