import "dotenv/config";
import { z as zod } from "zod";

const envSchema = zod.object({
  BASE_URL: zod.string(),
  DATABASE_URL: zod.string(),
  NODE_ENV: zod.enum(["development", "production", "test"]).optional().default("development"),
  SENTRY_DSN: zod.string().optional(),
  SENTRY_ENV: zod.enum(["development", "production", "test"]).optional().default("development"),
  PORT: zod.coerce.number().optional().default(3000),
});

export default envSchema.parse(process.env);
