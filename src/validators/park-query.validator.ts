import { z as zod } from "zod";
import { MeasureUnit } from "../enums/measure-unit.enum";
import { ParkCommunityType } from "@prisma/client";
import { PageQuerySchema } from "./page-query.validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     ParkQuery:
 *       allOf:
 *         - $ref: '#/components/schemas/PageQuerySchema'
 *         - type: object
 *           properties:
 *             search_string:
 *               type: string
 *               description: Search for parks where at least one of the following fields must match - Zip Code, Address, City, State, or Name.
 *               example: "New York 10001 Sunshine Park"
 *             q:
 *               type: string
 *               description: City, state, zip or partial address for geocoding/search.
 *               example: "New York"
 *             name:
 *               type: string
 *               description: Name of the park.
 *               example: "Grandview Mobile Home Park"
 *             lat:
 *               type: number
 *               description: Latitude for the park search.
 *               example: 40.7128
 *             lng:
 *               type: number
 *               description: Longitude for the park search.
 *               example: -74.0060
 *             radius:
 *               type: number
 *               description: Search radius (in units defined by measureUnit).
 *               minimum: 1
 *               maximum: 500
 *               default: 5
 *               example: 10
 *             measureUnit:
 *               type: string
 *               enum: [km, mi, yd, m]
 *               description: Unit used for radius.
 *               default: m
 *               example: "mi"
 *             communityType:
 *               type: string
 *               enum: [ALL_AGE, SENIOR]
 *               description: Type of the park community.
 *               example: "ALL_AGE"
 *             lotRentMin:
 *               type: number
 *               description: Minimum lot rent for the park.
 *               example: 100
 *             lotRentMax:
 *               type: number
 *               description: Maximum lot rent for the park.
 *               example: 1000
 *             spaceCountMin:
 *               type: number
 *               description: Minimum number of spaces in the park.
 *               example: 10
 *             spaceCountMax:
 *               type: number
 *               description: Maximum number of spaces in the park.
 *               example: 50
 *             isSaved:
 *               type: boolean
 *               description: Filter to get parks saved by user.
 *               example: true
 *   parameters:
 *     search_string:
 *       in: query
 *       name: search_string
 *       schema:
 *         type: string
 *       description: Search for parks where at least one of the following fields must match - Zip Code, Address, City, State, or Name.
 *       example: "New York 10001 Sunshine Park"
 *     q:
 *       in: query
 *       name: q
 *       schema:
 *         type: string
 *       description: City, state, zip or partial address for geocoding/search
 *       example: "New York"
 *     name:
 *       in: query
 *       name: name
 *       schema:
 *         type: string
 *       description: Name of the park
 *       example: "Grandview Mobile Home Park"
 *     lat:
 *       in: query
 *       name: lat
 *       schema:
 *         type: number
 *       description: Latitude for the park search
 *       example: 40.7128
 *     lng:
 *       in: query
 *       name: lng
 *       schema:
 *         type: number
 *       description: Longitude for the park search
 *       example: -74.0060
 *     radius:
 *       in: query
 *       name: radius
 *       schema:
 *         type: number
 *       description: Search radius (in units defined by measureUnit)
 *       example: 10
 *     measureUnit:
 *       in: query
 *       name: measureUnit
 *       schema:
 *         type: string
 *         enum: [km, mi, yd, m]
 *       description: Unit used for radius
 *       example: "m"
 *     communityType:
 *       in: query
 *       name: communityType
 *       schema:
 *         type: string
 *         enum: [ALL_AGE, SENIOR]
 *       description: Type of the park community
 *       example: "ALL_AGE"
 *     lotRentMin:
 *       in: query
 *       name: lotRentMin
 *       schema:
 *         type: number
 *       description: Minimum lot rent for the park
 *       example: 100
 *     lotRentMax:
 *       in: query
 *       name: lotRentMax
 *       schema:
 *         type: number
 *       description: Maximum lot rent for the park
 *       example: 1000
 *     spaceCountMin:
 *       in: query
 *       name: spaceCountMin
 *       schema:
 *         type: number
 *       description: Minimum number of spaces in the park
 *       example: 10
 *     spaceCountMax:
 *       in: query
 *       name: spaceCountMax
 *       schema:
 *         type: number
 *       description: Maximum number of spaces in the park
 *       example: 50
 *     isSaved:
 *       in: query
 *       name: isSaved
 *       schema:
 *         type: boolean
 *       description: Filter to get parks saved by user
 *       example: true
 *   x-park-parameters:
 *     - $ref: '#/components/parameters/currentPage'
 *     - $ref: '#/components/parameters/pageSize'
 *     - $ref: '#/components/parameters/sortBy'
 *     - $ref: '#/components/parameters/search_string'
 *     - $ref: '#/components/parameters/q'
 *     - $ref: '#/components/parameters/name'
 *     - $ref: '#/components/parameters/lat'
 *     - $ref: '#/components/parameters/lng'
 *     - $ref: '#/components/parameters/radius'
 *     - $ref: '#/components/parameters/measureUnit'
 *     - $ref: '#/components/parameters/communityType'
 *     - $ref: '#/components/parameters/lotRentMin'
 *     - $ref: '#/components/parameters/lotRentMax'
 *     - $ref: '#/components/parameters/spaceCountMin'
 *     - $ref: '#/components/parameters/spaceCountMax'
 *     - $ref: '#/components/parameters/isSaved'
 */
export const ParkQuerySchema = PageQuerySchema.merge(
  zod.object({
    search_string: zod.string().optional(),

    q: zod.string().optional(),

    name: zod.string().optional(),

    lat: zod.coerce.number().optional(),
    lng: zod.coerce.number().optional(),

    radius: zod.coerce.number().min(1).max(500).optional().default(5),

    measureUnit: zod.nativeEnum(MeasureUnit).default(MeasureUnit.Meters),

    communityType: zod.nativeEnum(ParkCommunityType).optional(),

    lotRentMin: zod.coerce.number().optional(),
    lotRentMax: zod.coerce.number().optional(),

    spaceCountMin: zod.coerce.number().optional(),
    spaceCountMax: zod.coerce.number().optional(),

    isSaved: zod.preprocess((value) => {
      if (value === "false") return false;
      if (value === "true") return true;
      return;
    }, zod.boolean().optional()),
  }),
);
