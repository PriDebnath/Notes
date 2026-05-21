import { env } from "../load-env";
import { Queue, Worker } from "bullmq";

const channelName = "queue";

export let queue: Queue | null = null;

export const startQueue = () => {
  const url = env.REDIS_URL;

  if (!url) {
    console.log("🟨 Redis disabled → skipping queue & worker");
    return; // ✅ works here
  }

  const connection = { url };

  queue = new Queue(channelName, { connection });

  console.log("🟩 queue is running");

  const worker = new Worker(
    channelName,
    async (job) => {
      console.log("Processing:", job.data);
    },
    { connection }
  );

  console.log("🟩 worker is running");
};