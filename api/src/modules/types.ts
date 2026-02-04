import { Express } from "express";

export interface Module {
    init?: () => Promise<void>;
    routes?: (app: Express) => void;
    start?: () => Promise<void>;
}
