interface Entry {
  id: number;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ExampleResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Example id.
 */
export function toExample(entry: Entry) {
  return {
    id: entry.id,
  };
}
