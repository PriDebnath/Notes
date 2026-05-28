import { z } from "zod";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

const envSchema = z.object({
    REDIS_URL: z.string().optional(),
    PORT: z.coerce.number().default(8000),
    PG_DATABASE_URL: z.string().min(1, "PG_DATABASE_URL is required"),
});

type Env = z.infer<typeof envSchema>;

export let env: Env = envSchema.parse(process.env);

if (env) {
    console.log("🟩 ENV data loaded");
} else {
    console.error("🟥ENV could not load");
    process.exit(1);
}
