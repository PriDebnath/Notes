import { queue } from "./worker.config ";
import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

export const dashboardPath = "/queues"
export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath(dashboardPath);

createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter,
});

