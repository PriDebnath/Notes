import  app  from "./app"
import { connectDB } from "./utils/connect-db";
import {  getEnv, loadEnv } from "./utils/load-env";

async function startServer() {
  await loadEnv();

  await connectDB()

  const { PORT } = getEnv();

  app.listen(PORT || 8000, () => {
    console.log(`🟩 Server running on port ${PORT}`);
  });
}

startServer();