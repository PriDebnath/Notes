import {  env} from "./utils/load-env"; // should be  at top
import  app  from "./app"

async function startServer() {
  const { PORT } = env;

  app.listen(PORT || 8000, () => {
    console.log(`🟩 "Express with PG" Server running on port ${PORT}`);
  });
}

startServer();