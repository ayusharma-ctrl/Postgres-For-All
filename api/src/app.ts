import express from "express";
import pino from "pino";
import { healthRouter } from "./routes/health";

export const logger = pino();

export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(healthRouter);

    return app;
}
