import { Router } from "express";
import { publishEvent } from "./pubsub.service";

export const pubsubRouter = Router();

pubsubRouter.post("/job-created", async (req, res) => {
    const data = req.body;

    await publishEvent(
        "job_created",
        {
            jobId: crypto.randomUUID(),
            data: { ...data },
        }
    );

    res.json({ published: true });
});
