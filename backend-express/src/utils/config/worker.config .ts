// queue.service.ts

import { Queue, Worker, type ConnectionOptions } from "bullmq";
import { env } from "../load-env";
import { runBullBoard } from "./worker-dashboard.config";

export class QueueService {
  readonly queue: Queue;
  readonly worker: Worker;

  constructor(connection: ConnectionOptions, queueName: string) {
    this.queue = new Queue(queueName, { connection });

    this.worker = new Worker(
      queueName,
      async (job) => {
        console.log("Processing:", job.data);
      },
      { connection }
    );
  }
}

export const queueService =
  env.REDIS_URL
    ? new QueueService({ url: env.REDIS_URL }, "queue")
    : null;

if (!queueService) {
  console.log("🟨 Redis disabled");
} else {
  console.log("🟩 Queue running");
  runBullBoard();
}


