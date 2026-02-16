import { Router } from "express";
import { enqueueJob } from "./queue.service";
import { EmailJobPayload } from "./queue.types";
import { publishEvent } from "../pubsub/pubsub.service";

export const queueRouter = Router();

queueRouter.post("/jobs/email", async (req, res) => {
  const payload: EmailJobPayload = req.body;

  await enqueueJob("email", payload);

  await publishEvent(
    "job_created",
    {
      jobId: crypto.randomUUID(),
      data: {
        type: 'email',
        ...payload,
      },
    }
  );

  res.json({ queued: true });
});
