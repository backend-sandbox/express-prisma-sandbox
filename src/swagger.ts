import swaggerJsDoc from "swagger-jsdoc";
import env from "./env";
import { description, version } from "../package.json";

export default swaggerJsDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: description,
      version,
    },
    servers: [
      {
        url: env.BASE_URL,
      },
    ],
  },
  apis: ["./*.ts", "./**/*.ts"],
});
