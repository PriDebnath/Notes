import  app  from "./app"
import { connectRedis } from "./utils/config/redis.config";
import { connectDB } from "./utils/connect-db";
import {  getEnv, loadEnv } from "./utils/load-env";

async function startServer() {
  await loadEnv();
  const { PORT } = getEnv();

  await connectDB()

  await connectRedis()


  app.listen(PORT || 8000, () => {
    console.log(`🟩 Server running on port ${PORT}`);
  });
}

startServer();