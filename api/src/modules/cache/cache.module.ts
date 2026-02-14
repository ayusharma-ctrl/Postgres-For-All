import { Module } from "../types";
import { cacheRouter } from "./cache.routes";
import { startCacheCleanupWorker } from "./cache.worker";
import "./cache.model";


export const cacheModule: Module = {
    routes(app) {
        app.use("/api/v1/cache", cacheRouter);
    },

    async start() {
        startCacheCleanupWorker();
    }
};
