import { QueryTypes } from "sequelize";
import { sequelize } from "../../db";

export interface SearchResult {
    id: string;
    type: string;
    payload: unknown;
    rank: number;
}

export async function searchJobs(query: string): Promise<SearchResult[]> {
    const results = await sequelize.query<SearchResult>(`
        SELECT
            id,
            type,
            payload,
            ts_rank(search_vector, plainto_tsquery('simple', :query)) AS rank
        FROM jobs
        WHERE
            search_vector @@ plainto_tsquery('english', :query) OR payload::text ILIKE '%' || :query || '%'
        ORDER BY rank DESC
        LIMIT 20
        `,
        {
            replacements: { query },
            type: QueryTypes.SELECT
        }
    );

    return results;
}
