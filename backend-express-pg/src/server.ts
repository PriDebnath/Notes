import {  env} from "./utils/load-env"; // should be  at top
import  app  from "./app"
import { connectDB } from "./database/connection";
import { connectRedis } from "./utils/redis/connect-redis";

async function startServer() {
  const { PORT } = env;

  await connectDB()
  await connectRedis()
  
  app.listen(PORT || 8000, () => {
    console.log(`🟩 "Express with PG" Server running on port ${PORT}`);
  });
}

startServer();