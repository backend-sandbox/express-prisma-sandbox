import { z as zod } from "zod";

// TODO: Use `zod-to-openapi` to generate OpenAPI schema from Zod.

/**
 * @swagger
 * components:
 *   schemas:
 *     ExampleRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Example id.
 */
export const exampleValidator = zod.object({
  query: zod.object({
    id: zod.coerce.number().int().positive(),
  }),
});

export type ExampleSchema = zod.infer<typeof exampleValidator>;
