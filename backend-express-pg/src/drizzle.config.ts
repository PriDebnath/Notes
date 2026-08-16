import { env } from './utils/load-env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './src/database/migrations/drizzle',
    schema: './src/database/model/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.PG_DATABASE_URL!,
    },
});
