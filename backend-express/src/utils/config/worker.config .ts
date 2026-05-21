import { env } from "../load-env";
import { Queue, Worker } from "bullmq";

const url = env.REDIS_URL
if (!url) {
  console.log("🟨 Redis disabled so does the worker (no URL)");
}

const connection = {
  url: url
};

const channelName = "queue"
export let queue = new Queue(channelName, { connection })

if (queue) {
    console.log("🟩 worker is running");
}else{
    console.log("🟥 worker is not running");
}
const worker = new Worker(
  channelName,
  async (job) => {
    // console.log("Processing:", job.data);

    //  mock failure condition
    // if (job.data.fail) {
    //   throw new Error(" Mock failure triggered");
    // }  
    },
  { connection }
)


