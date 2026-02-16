import { Module } from "../types";
import { pubsubRouter } from "./pubsub.routes";
import { startPubSubListener } from "./pubsub.listener";


export const pubsubModule: Module = {
    routes(app) {
        app.use("/api/v1/pubsub", pubsubRouter);
    },

    async start() {
        await startPubSubListener();
    }
};
