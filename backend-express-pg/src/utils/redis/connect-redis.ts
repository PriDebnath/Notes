import redis, { createClient } from "redis"
import { env } from "../load-env"

export let redisClient: ReturnType<typeof redis.createClient>

export const connectRedis = async () => {
    try {
        const url = env.REDIS_URL;
        if (!url) {
            console.log("🟨 Redis disabled (no URL)");
            return;
        }
        redisClient = createClient({ url });
        await redisClient.connect();
        console.log("🟩 Redis connected");
    } catch (error) {
        console.error("🟥 Redis could not connect: ", error);
    }
}