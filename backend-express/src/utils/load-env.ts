import { z } from "zod";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: path.resolve(__dirname, "../../../.env"),
});

const envSchema = z.object({
    MONGO_URI: z.string().min(1, "MONGO_URI is required"),
    REDIS_URL: z.string().optional(),
    PORT: z.coerce.number().default(3000),
});

type Env = z.infer<typeof envSchema>;

export let env: Env = envSchema.parse(process.env);

if (env) {
    console.log("🟩 env data loaded");
} else {
    console.error("🟥 could not load env data");
    process.exit(1);
}
