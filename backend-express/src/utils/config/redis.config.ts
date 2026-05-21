import { createClient } from "redis"
import { env } from "../load-env"

export let clientRedis: ReturnType<typeof createClient>;

export const connectRedis = async () => {
  try {
    const url = env.REDIS_URL;

    if (!url) {
      console.log("🟨 Redis disabled (no URL)");
      return;
    }

    clientRedis = createClient({ url });

    await clientRedis.connect();

    console.log("🟩 redis is running");
  } catch (error) {
    // console.log(error)
    console.error("🟥 redis is not running");
  }
};

