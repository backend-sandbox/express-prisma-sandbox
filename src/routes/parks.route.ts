import { Router } from "express";

import { ParksController } from "../controllers/park.controller";
import { limiter } from "../middlewares/limiter.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { validate } from "../middlewares/validate.middleware";
import { BulkUpsertParksSchema } from "../validators/bulk-upsert-parks.validator";

export const ParksRouter = Router();

const parksController = new ParksController();

/**
 * @swagger
 * tags:
 *   name: Parks
 *   description: Parks endpoints
 */

/**
 * @swagger
 * /api/parks/bulk-upsert:
 *   post:
 *     summary: Bulk upsert parks from a CSV file.
 *     tags: [Parks]
 *     description: Bulk upsert parks from a CSV file.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BulkUpsertParksRequest'
 *     responses:
 *       200:
 *         description: Successfully bulk upsert parks from CSV file to DB.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/BulkUpsertParksResponse'
 *       400:
 *         description: Invalid body parameters
 *       401:
 *         description: Unauthorized, invalid or missing authentication token
 *       429:
 *         description: Too many requests, rate limit exceeded
 *       500:
 *         description: Internal server error
 */
ParksRouter.post(
  "/bulk-upsert",
  validate(BulkUpsertParksSchema),
  limiter(timeConstant.ONE_SECOND, 1, true),
  catchHandler(parksController.bulkUpsertParksFromCsv.bind(parksController)),
);
