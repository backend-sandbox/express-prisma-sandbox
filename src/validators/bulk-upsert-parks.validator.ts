import { z as zod } from "zod";
import validationConstant from "../constants/validation.constant";

/**
 * @swagger
 * components:
 *   schemas:
 *     BulkUpsertParksRequest:
 *       type: object
 *       required:
 *         - mapping
 *         - data
 *       properties:
 *         mapping:
 *           type: array
 *           description: Field names mapping to columns in the data
 *           minItems: 2
 *           items:
 *             type: string
 *             enum: [
 *               "name",
 *               "address",
 *               "lotRent",
 *               "spaceRent",
 *               "communityType",
 *               "utilitiesIncluded",
 *               "infrastructure",
 *               "effectiveLotRent",
 *               "averageLotRent",
 *               "averageAreaRent",
 *               "medianHomePrice",
 *               "spaceCount",
 *               "mortgage",
 *               "lat",
 *               "lng"
 *             ]
 *           example: ["name", "address", "lotRent", "spaceCount", "communityType"]
 *         data:
 *           type: array
 *           description: Two-dimensional array containing rows of park data
 *           maxItems: 100000
 *           items:
 *             type: array
 *             items:
 *               oneOf:
 *                 - type: string
 *                 - type: number
 *                 - type: "null"
 *             example: ["Sunny Valley MHP", "123 Main St, Anytown CA 12345", 500, 50, "ALL_AGE"]
 *       example:
 *         mapping: ["name", "address", "lotRent", "spaceCount", "communityType"]
 *         data: [
 *           ["Sunny Valley MHP", "123 Main St, Anytown CA 12345", 500, 50, "ALL_AGE"],
 *           ["Senior Living Park", "456 Oak Ave, Somewhere FL 67890", 700, 30, "SENIOR"]
 *         ]
 *
 *     BulkUpsertParksResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "CSV file uploaded successfully."
 *             insertedCount:
 *               type: number
 *               description: Number of parks processed and inserted
 *               example: 2
 */
export const BulkUpsertParksSchema = zod.object({
  body: zod.object({
    mapping: zod
      .array(zod.string())
      .min(2, validationConstant.MISSING_REQUIRED_MAPPING_FIELDS)
      .refine((fields) => fields.includes("name") && fields.includes("address"), {
        message: validationConstant.MISSING_REQUIRED_MAPPING_FIELDS,
      }),
    data: zod
      .array(zod.array(zod.union([zod.string(), zod.number(), zod.null()])))
      .max(100000, validationConstant.MAXIMUM_ROWS_LIMIT),
  }),
});
