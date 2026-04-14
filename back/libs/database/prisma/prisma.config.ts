import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
    schema: "schema.prisma",
    migrations: {
        path: "migrations", // Pasta de migrações
        seed: "tsx seed.ts", // Comando para seed
    },
    datasource: {
        url: process.env.DATABASE_URL
    },
});