import { createApp, logger } from "./app";
import { connectDB } from "./db";
import { initModules, mountRoutes, startWorkers } from "./modules";
import { startBackgroundWorkers } from "./workers";
import { env } from "./config/index";

async function bootstrap() {
    await connectDB();
    await initModules();

    const app = createApp();
    mountRoutes(app);

    app.listen(env.PORT, () =>
        logger.info(`API running on http://localhost:${env.PORT}`)
    );

    await startWorkers();
    await startBackgroundWorkers();
}

bootstrap();
