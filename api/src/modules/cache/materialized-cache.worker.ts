import { logger } from "../../app";
import { refreshJobStatsCache } from "./materialized-cache.service";

const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour for now

export function startMaterializedViewRefreshWorker(): void {
    logger.info("Materialized view refresh worker started");

    setInterval(async () => {
        try {
            await refreshJobStatsCache();
            logger.info("Materialized view refreshed");
        } catch (error) {
            logger.error({ error }, "Materialized view refresh failed");
        }
    }, REFRESH_INTERVAL_MS);
}
