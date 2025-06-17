import "dotenv/config";
import { z as zod } from "zod";

const envSchema = zod.object({
  CORS_ORIGIN: zod.string().optional().default("*"),
  ADMIN_PASSWORD: zod.string().optional().default("admin"),

  NODE_ENV: zod.enum(["development", "production", "test"]).optional().default("development"),

  BASE_URL: zod.string(),
  HOST: zod.string().optional().default("localhost"),
  PORT: zod.coerce.number().optional().default(5371),

  SENTRY_DSN: zod.string().optional(),
  SENTRY_ENV: zod.string().optional(),

  DB_PORT: zod.coerce.number().default(5432),
  DB_HOST: zod.string().default("localhost"),
  DB_USER: zod.string().default("postgres"),
  DB_PASSWORD: zod.string().default("postgres"),
  DB_NAME: zod.string().default("schedule_db"),

  DATABASE_URL: zod.string(),
});

export default envSchema.parse(process.env);
