

import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import { env } from "../../utils/load-env"
import * as schema from "../model/index"

export const pool = new Pool({
connectionString:  env.PG_DATABASE_URL
})

export const db = drizzle(pool, { schema: schema})

export const connectDB = async () => {
    try {
        await pool.connect()
        console.info("🟩 DB connected")
    } catch (err) {
        console.error("🟥 DB connection failed: ", err)
        process.exit(1)
    }
 }

