import { Router } from "express";
import { rateLimitMiddleware } from "./rate-limit.middleware";

export const rateLimitRouter = Router();

rateLimitRouter.get("/test", rateLimitMiddleware(5, 60), (req, res) => {
    res.json({ message: "Request allowed" });
});
