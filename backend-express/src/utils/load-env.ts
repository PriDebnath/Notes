import { z } from "zod";
import path from "path";
import dotenv from "dotenv";

const envSchema = z.object({
    MONGO_URI: z.string(),
    PORT: z.coerce.number(),
});

type Env = z.infer<typeof envSchema>;

let env: Env;

export const loadEnv = async () => {
    dotenv.config({
        path: path.resolve(__dirname, "../../../.env"),
    });

    try {
        env = await envSchema.parseAsync(process.env);
        console.log("🟩 env data loaded");
    } catch (error) {
        console.error("🟥 could not load env data");
        console.error(error);
        process.exit(1);
    }
};

export const getEnv = (): Env => {
    if (!env) {
        throw new Error("Env not loaded. Call loadEnv() first.");
    }
    return env;
};