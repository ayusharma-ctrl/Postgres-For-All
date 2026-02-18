import { QueryTypes } from "sequelize";
import { sequelize } from "../../db";

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
}

/*  this is fixed window rate limit
    for sliding window, we only need to store key and request timestamp
    storing each request timestamp and counting how many happened in the last X seconds instead of keeping a single counter
    1. delete entries outside time window, add a new entry for this request, and count X, based on count and limit, allow or block
    main tradeoff with sliding window approach -> high db load under traffic
    this query is atomic and no race condition, can handle concurrency (conflict when multiple requests -> at same time) 
*/
export async function checkRateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {

    const windowStart = new Date(Date.now() - windowSeconds * 1000);

    const result = await sequelize.query<{ count: number }>(
        `
            INSERT INTO rate_limits (key, count, window_start) VALUES (:key, 1, NOW())

            ON CONFLICT (key)
            DO UPDATE
            SET
                count =
                    CASE
                    WHEN rate_limits.window_start < :windowStart THEN 1
                    ELSE rate_limits.count + 1
                    END,

                window_start =
                    CASE
                    WHEN rate_limits.window_start < :windowStart THEN NOW()
                    ELSE rate_limits.window_start
                    END

            RETURNING count
        `,
        {
            replacements: { key, windowStart },
            type: QueryTypes.SELECT
        }
    );

    const count = result[0].count;

    return {
        allowed: count <= limit,
        remaining: Math.max(limit - count, 0)
    };
}


/*

Approach for sliding window

WITH deleted AS (
    DELETE FROM rate_limits
    WHERE key = :key
    AND request_time < NOW() - INTERVAL ':windowSeconds seconds'
),
inserted AS (
    INSERT INTO rate_limits (key, request_time)
    VALUES (:key, NOW())
)
SELECT COUNT(*) AS count
FROM rate_limits
WHERE key = :key;

*/