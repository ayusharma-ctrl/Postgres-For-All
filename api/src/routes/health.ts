import { Router } from "express";
import { checkDatabaseConnection } from "../db";

export const healthRouter = Router();

healthRouter.get("/health", async (_, res) => {
    const dbStatus = await checkDatabaseConnection();

    res.json({ status: "ok", dbStatus: dbStatus ? "ok" : "not ok" });
});
