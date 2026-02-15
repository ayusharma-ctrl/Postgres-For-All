import { refreshJobStatsCache } from "./materialized-cache.service";

const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour for now

export function startMaterializedViewRefreshWorker(): void {
    console.log("Materialized view refresh worker started");

    setInterval(async () => {
        try {
            await refreshJobStatsCache();
            console.log("Materialized view refreshed");
        } catch (error) {
            console.error("Materialized view refresh failed:", error);
        }
    }, REFRESH_INTERVAL_MS);
}
