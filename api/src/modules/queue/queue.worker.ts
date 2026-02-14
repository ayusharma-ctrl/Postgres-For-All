import {
  fetchNextJob,
  markFailure,
  markSuccess
} from "./queue.service";
import { JobPayloadMap, JobType } from "./queue.types";

type HandlerMap = {
  [K in JobType]: (payload: JobPayloadMap[K]) => Promise<void>;
};

// here we can define as many as handlers/jobs for which we craete queue
const handlers: HandlerMap = {
  email: async (payload) => {
    console.log("📧 sending email:", payload.to);
    // we can throw error here to simulate job failed, retry logic
    // throw new Error('Method to send mails is not complete');
  }
};

// thi smethod will start the worker in background
export async function startQueueWorker() {
  console.log("🚀 queue worker started");

  setInterval(async () => {
    const job = await fetchNextJob();
    if (!job) return;

    try {
      const handler = handlers[job.type];

      if (!handler) throw new Error("Unknown job type");

      await handler(job.payload as any);

      await markSuccess(job.id); // if task is done, update job status
      console.log(`Job Id: ${job.id} is success`);
    } catch (err) {
      await markFailure(job, err);
    }
  }, 200);
}
