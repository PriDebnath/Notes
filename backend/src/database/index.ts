
import { Pool } from "pg"
import { env } from '@/src/utils/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@/src/database/schema/index"
import { logger } from "../utils/logger";

export const pool = new Pool({
    connectionString: env.DATABASE_URL
})

export const db = drizzle(pool, { schema: schema })

export const connectDB = async () => {
    try {
        await pool.connect()
        logger.info("🟩 DB connected")
    } catch (err) {
        logger.error("🟥 DB connection failed")
        process.exit(1)
    }
}

connectDB()