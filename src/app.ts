import express from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";

import { setupSwagger } from "./config/providers/swagger-config.provider";
import { globalErrorHandler } from "./middlewares/error.middleware";
import routes from "./routes";

const app = express();

/**
 * Configure middleware
 */
app.set("trust proxy", true);

app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api", routes);

/**
 * Debug routes
 * @swagger
 * /debug-sentry:
 *   get:
 *     summary: Debug Sentry endpoint.
 *     tags: [Debug]
 *     responses:
 *       500:
 *         description: Internal Server Error
 */
app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

setupSwagger(app);

app.use(globalErrorHandler);

export default app;
