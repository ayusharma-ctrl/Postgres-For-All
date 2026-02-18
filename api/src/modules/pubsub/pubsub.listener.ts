import pg from "pg";
import { env } from "../../config/index";
import {
    PubSubChannel
} from "./pubsub.types";
import { notifyQueueWorker } from "../queue/queue.worker";
import { logger } from "../../app";


const client = new pg.Client({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
});


type EventHandler = (payload: unknown) => void;

// these are nothing but methods,
// for example, if notifaction received on channel X, call this function
const handlers: Partial<Record<PubSubChannel, EventHandler>> = {
    job_created: (payload) => {
        logger.info({ payload }, "Received job_created event");
        // here i notify queue worker to check and self-assign job
        notifyQueueWorker();
    },

    cache_invalidated: (payload) => {
        logger.info({ payload }, "Received cache_invalidated event");
    }
};

// method to initialize a listener
export async function startPubSubListener(): Promise<void> {
    await client.connect();

    logger.info("PubSub listener connected");

    const channels: PubSubChannel[] = ["job_created", "cache_invalidated"];

    for (const channel of channels) {
        await client.query(
            `LISTEN ${channel}`
        );
    }

    client.on("notification", (msg) => {
        const channel = msg.channel as PubSubChannel;
        const payload = JSON.parse(msg.payload ?? "{}");
        handlers[channel]?.(payload);
    });
}
