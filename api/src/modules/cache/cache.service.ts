import { Cache } from "./cache.model";

/* 
    helper method to read cache from db
        - not found
            return null
        - found
            check expire_at
            - if expire, delete from db
            - else return data
*/
export async function getCache<T>(
    key: string
): Promise<T | null> {
    const row = await Cache.findOne({
        where: { key }
    });

    if (!row) return null;

    if (row.expires_at < new Date()) {
        await Cache.destroy({ where: { key } });
        console.log("Cache Expired");
        return null;
    }

    console.log("From cache...");
    return row.value as T;
}

// straight forward crud operation - create or update
export async function setCache<T extends object>(
    key: string,
    value: T,
    ttlSeconds: number
) {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    await Cache.upsert({
        key,
        value,
        expires_at: expiresAt
    });
}

// method to delete cache forcefully
export async function deleteCache(
    key: string
) {
    await Cache.destroy({
        where: { key }
    });
}


// this is actual service method - here we use caching methods - read or add data to cache
export async function getOrSetCache<T extends object>(
    key: string,
    ttlSeconds: number,
    fetcher: () => Promise<T>
): Promise<T> {

    const cached = await getCache<T>(key);

    if (cached !== null) return cached; // if found, return data

    const fresh = await fetcher(); // call fallback method to fetch requested data, this can be a rest api call or db read

    await setCache(key, fresh, ttlSeconds); // cache that data before return

    return fresh;
}
