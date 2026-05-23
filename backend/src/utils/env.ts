import { z } from "zod"
import { logger } from "@/src/utils/logger"

const envSchema = z.object({
    DATABASE_URL: z.url()
  })
  
export const env = envSchema.parse(process.env)

const variableKeys = Object.keys(env).length
const variableValues = Object.values(env).length
logger.info(
    "🟩 Environment variables loaded successfully: " 
    + variableValues + "/" + variableKeys
)