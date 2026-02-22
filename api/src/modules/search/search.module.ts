import { Module } from "../types";
import { searchRouter } from "./search.route";

export const searchModule: Module = {
    routes(app) {
        app.use("/api/v1/search", searchRouter);
    }
};
