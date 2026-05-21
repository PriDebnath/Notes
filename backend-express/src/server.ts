import {  env} from "./utils/load-env"; // should be  at top
import  app  from "./app"
import { connectRedis } from "./utils/config/redis.config";
import { connectDB } from "./utils/connect-db";

async function startServer() {
  const { PORT } = env;

  await connectDB()

  await connectRedis()

  app.listen(PORT || 8000, () => {
    console.log(`🟩 Server running on port ${PORT}`);
  });
}

startServer();