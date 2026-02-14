import { Router } from "express";
import { enqueueJob } from "./queue.service";
import { EmailJobPayload } from "./queue.types";

export const queueRouter = Router();

queueRouter.post("/jobs/email", async (req, res) => {
  const payload: EmailJobPayload = req.body;

  await enqueueJob("email", payload);

  res.json({ queued: true });
});
