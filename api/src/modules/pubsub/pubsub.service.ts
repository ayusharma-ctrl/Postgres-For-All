import { sequelize } from "../../db";
import { PubSubChannel } from "./pubsub.types";


export async function publishEvent<T>(
    channel: PubSubChannel,
    payload: T
): Promise<void> {
    const message = JSON.stringify(payload);

    await sequelize.query(
        `
            SELECT pg_notify(
                :channel,
                :payload
            )
        `,
        {
            replacements: {
                channel,
                payload: message
            }
        }
    );
}
