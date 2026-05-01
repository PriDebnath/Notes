import z from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(1, "name should not be empty"),
  email: z.email().min(1, "email should not be empty"),
})