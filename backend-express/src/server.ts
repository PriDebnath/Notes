import {app} from "./app"
import {  getEnv, loadEnv } from "./utils/load-env";

async function startServer() {
  await loadEnv();

  const { PORT } = getEnv();

  app.listen(PORT || 8000, () => {
    console.log(`🟩 Server running on port ${PORT}`);
  });
}

startServer();