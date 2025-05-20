import * as Sentry from "@sentry/node";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { globalErrorHandler } from "./middlewares/error.middleware";
import routes from "./routes";
import swaggerDocument from "./swagger";

const app = express();

/**
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

app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

Sentry.setupExpressErrorHandler(app);
app.use(globalErrorHandler);

export default app;
