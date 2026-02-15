import { QueryTypes } from "sequelize";
import { sequelize } from "../../db";
import { JobStatsRow } from "./cache.type";


/* Read cached data */
export async function getJobStats(): Promise<JobStatsRow[]> {
    const rows = await sequelize.query<JobStatsRow>(
    `
        SELECT
            type,
            status,
            count
        FROM job_stats_mv
    `,
        {
            type: QueryTypes.SELECT
        }
    );

    return rows;
}


/* Refresh cache - workers will use this method */
export async function refreshJobStatsCache(): Promise<void> {
    await sequelize.query(`
        REFRESH MATERIALIZED VIEW CONCURRENTLY job_stats_mv
    `);
}
