import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import basicAuth from "express-basic-auth";

import { Operation } from "../../types/swagger-operation.type";
import swaggerDocumentType from "../../swagger";
import env from "../../env";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerDocument: any = swaggerDocumentType;

const adminPassword = env.ADMIN_PASSWORD || "admin";

function operationSorter(operationA: Operation, operationB: Operation): number {
  const order: string[] = ["get", "post", "put", "patch", "delete"];
  return order.indexOf(operationA.get("method")) - order.indexOf(operationB.get("method"));
}

export const setupSwagger = (app: Express) => {
  app.use(
    ["/api-docs"],
    basicAuth({
      challenge: true,
      users: {
        admin: adminPassword,
      },
    }),
  );

  const swaggerOptions = {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: operationSorter,
    },
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
};
