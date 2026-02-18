import { Request, Response, NextFunction } from "express";
import { checkRateLimit } from "./rate-limit.service";

export function rateLimitMiddleware(limit: number, windowSeconds: number) {
    return async function (req: Request, res: Response, next: NextFunction) {

        const key = req.ip ?? "unknown";

        const result = await checkRateLimit(key, limit, windowSeconds);

        res.setHeader("X-RateLimit-Remaining", result.remaining);

        if (!result.allowed) {
            res.status(429).json({ error: "Too many requests" });
            return;
        }

        next();
    };
}
