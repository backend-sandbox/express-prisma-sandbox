import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import env from "./env";

if (env.SENTRY_DSN !== undefined) {
  const options: Sentry.NodeOptions = {
    dsn: env.SENTRY_DSN,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  };

  if (env.SENTRY_ENV !== undefined) {
    options.environment = env.SENTRY_ENV;
  }

  Sentry.init(options);
}
