import { createClient } from "redis"
import { getEnv } from "../load-env"

let client: ReturnType<typeof createClient>;

export const connectRedis = async () => {
  try {
    const url = getEnv().REDIS_URL;

    if (!url) {
      console.log("🟨 Redis disabled (no URL)");
      return;
    }

    client = createClient({ url });

    await client.connect();

    console.log("🟩 redis is running");
  } catch (error) {
    console.log(error)
    console.error("🟥 redis is not running");
  }
};

export { client };
