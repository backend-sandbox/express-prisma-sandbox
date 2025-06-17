import { z as zod } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     PageQuery:
 *       type: object
 *       description: Pagination and sorting parameters passed via query-string
 *       properties:
 *         currentPage:
 *           type: integer
 *           description: Page number
 *           default: 1
 *           example: 1
 *         pageSize:
 *           type: integer
 *           description: Items per page
 *           default: 10
 *           example: 10
 *         sortBy:
 *           type: object
 *           description: Sorting parameters as an object with field names as keys and sort direction as values
 *           additionalProperties:
 *             type: string
 *             enum:
 *               - asc
 *               - desc
 *           default: { id: "asc" }
 *           example: { id: "asc" }
 *   parameters:
 *     currentPage:
 *       in: query
 *       name: currentPage
 *       schema:
 *         type: integer
 *       description: Page number
 *       example: 1
 *     pageSize:
 *       in: query
 *       name: pageSize
 *       schema:
 *         type: integer
 *       description: Items per page
 *       example: 10
 *     sortBy:
 *       in: query
 *       name: sortBy
 *       description: Sorting parameters, e.g. sortBy[name]=desc
 *       style: deepObject
 *       explode: true
 *       schema:
 *         type: object
 *         additionalProperties:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *       example:
 *         id: asc
 */
export const PageQuerySchema = zod.object({
  currentPage: zod.coerce.number().int().positive().optional().default(1),
  pageSize: zod.coerce.number().int().positive().optional().default(10),
  sortBy: zod.record(zod.enum(["asc", "desc"])).default({ id: "asc" }),
});
