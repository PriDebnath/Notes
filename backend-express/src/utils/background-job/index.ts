import { env } from "../load-env";
import { runBullBoard } from "./dashboard";
import { QueueManager } from "./manager"

export const QUEUES = {
    "email": "email",
    notification: "notification",
} as const

export const connection = {
    url: env.REDIS_URL
}

export const queueManager = connection?.url ? new QueueManager() : null;

// register queues before running dashboard
queueManager?.register(QUEUES.email, connection)
queueManager?.register(QUEUES.notification, connection)

if (queueManager) {
    console.log("🟩 Queue running");
    runBullBoard();
} else {
    console.log("🟨 Redis disabled thus background jobs are disabled");
}


