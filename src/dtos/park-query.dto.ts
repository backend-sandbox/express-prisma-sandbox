import { z as zod } from "zod";
import { ParkQuerySchema } from "../validators/park-query.validator";

export type ParkQueryDto = zod.infer<typeof ParkQuerySchema>;
