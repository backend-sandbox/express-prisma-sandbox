import { Router } from "express";
import { catchHandler } from "../middlewares/catch.middleware";
import * as controllers from "../controllers/example.controller";
import { exampleValidator } from "../validators/example.validator";
import { validate } from "../middlewares/validate.middleware";

export const ExampleRouter = Router();

// TODO: Find a better way to show error responses for ALL endpoints.

/**
 * @swagger
 * tags:
 *   name: Example
 *   description: Example endpoints
 */

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Example endpoint provided by the template.
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExampleRequest'
 *     responses:
 *       200:
 *         description: Return query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExampleResponse'
 */
ExampleRouter.get("/", validate(exampleValidator), catchHandler(controllers.get));
