import { Module } from "./types";
import { queueModule } from "./queue/queue.module";
import { cacheModule } from "./cache/cache.module";

const modules: Module[] = [
    queueModule,
    cacheModule,
];

export async function initModules() {
    for (const m of modules) {
        await m.init?.();
    }
}

export function mountRoutes(app: any) {
    for (const m of modules) {
        m.routes?.(app);
    }
}

export async function startWorkers() {
    for (const m of modules) {
        await m.start?.();
    }
}
