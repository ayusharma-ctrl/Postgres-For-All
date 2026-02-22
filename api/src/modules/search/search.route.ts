import { Router } from "express";
import { searchJobs } from "./search.service";

const searchRouter = Router();

searchRouter.get("/jobs", async (req, res) => {
    const query = req.query.q as string;
    const results = await searchJobs(query);
    res.json(results);
});

export { searchRouter };
