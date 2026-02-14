import { Op } from "sequelize";
import { Cache } from "./cache.model";

const CLEANUP_INTERVAL_MS = 30_000; // 30 seconds

export async function cleanupExpiredCache(): Promise<number> {
    const deletedCount = await Cache.destroy({
        where: {
            expires_at: {
                [Op.lt]: new Date()
            }
        }
    });

    return deletedCount;
}

export function startCacheCleanupWorker(): void {
    console.log("Cache cleanup worker started");

    setInterval(async () => {
        try {
            const deleted = await cleanupExpiredCache();

            if (deleted > 0) {
                console.log(`Cache cleanup removed ${deleted} expired entries`);
            }
        } catch (error) {
            console.error("Cache cleanup failed:", error);
        }
    }, CLEANUP_INTERVAL_MS);
}
