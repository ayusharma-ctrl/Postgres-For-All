export type PubSubChannel =
    | "job_created"
    | "cache_invalidated";

export interface JobCreatedEvent {
    jobId: string;
    type: string;
}

export interface CacheInvalidatedEvent {
    key: string;
}
