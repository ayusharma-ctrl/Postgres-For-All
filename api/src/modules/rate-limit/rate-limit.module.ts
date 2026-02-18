import { Module } from "../types";
import { rateLimitRouter } from "./rate-limit.routes";
import "./rate-limit.model";


export const rateLimitModule: Module = {
    routes(app) {
        app.use("/api/v1/rate-limit", rateLimitRouter);
    }
};
