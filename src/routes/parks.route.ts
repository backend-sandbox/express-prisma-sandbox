import { Router } from "express";

import { ParksController } from "../controllers/park.controller";
import { limiter } from "../middlewares/limiter.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { validate } from "../middlewares/validate.middleware";

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
 *             $ref: '#/components/schemas/ViewSaveParkBodySchema'
 *     responses:
 *       200:
 *         description: Park saved/unsaved status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ParkViewSchema'
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
  limiter(timeConstant.ONE_SECOND, 1, true),
  catchHandler(parksController.upsertParkView.bind(parksController)),
);
