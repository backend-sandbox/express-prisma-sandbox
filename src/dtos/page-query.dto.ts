import { z as zod } from "zod";
import { PageQuerySchema } from "../validators/page-query.validator";

export type PageQueryDto = zod.infer<typeof PageQuerySchema>;
