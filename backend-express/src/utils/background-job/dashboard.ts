import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { queueManager } from "../background-job/index";

export const dashboardPath = "/queues";

export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath(dashboardPath);

export function runBullBoard() {
  if (!queueManager) return;
  createBullBoard({
    queues: queueManager
      .getAll()
      .map(queue => new BullMQAdapter(queue)),
    serverAdapter,
  });
}