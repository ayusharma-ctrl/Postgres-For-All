import { Module } from "../types";
import { queueRouter } from "./queue.routes";
import { startQueueWorker } from "./queue.worker";
import "./queue.model"; // ensure model registration

export const queueModule: Module = {
  routes(app) {
    app.use("/api/v1/queue", queueRouter);
  },

  async start() {
    await startQueueWorker();
  }
};
