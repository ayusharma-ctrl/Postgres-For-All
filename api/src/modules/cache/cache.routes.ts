import { Router } from "express";
import {
    getOrSetCache,
    setCache
} from "./cache.service";


export const cacheRouter = Router();


cacheRouter.get("/test", async (req, res) => {
    const data = await getOrSetCache(
        "test-key",
        30,
        async () => {
            console.log("Fetching fresh data...");

            return {
                time: new Date()
            };
        }
    );

    res.json(data);
});

// this api call will directly store request body data to cache, no business logic
cacheRouter.post("/test", async (req, res) => {
    await setCache(
        "test-key",
        req.body,
        60
    );

    res.json({
        cached: true
    });
});
