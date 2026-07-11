import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { queueService } from "./worker.config ";

export const dashboardPath = "/queues";

export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath(dashboardPath);

export function runBullBoard() {
  if (!queueService) return;

  createBullBoard({
    queues: [new BullMQAdapter(queueService.queue)],
    serverAdapter,
  });
}