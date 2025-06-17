import { NextFunction, Response, Request } from "express";
import rateLimit from "express-rate-limit";
import { TooManyRequests } from "http-errors";

import errorConstant from "../constants/error.constant";

export const limiter = (windowMs: number, limit: number, limiterForUser?: boolean) => {
  return rateLimit({
    windowMs,
    limit,
    keyGenerator: (req: Request): string => {
      if (limiterForUser) {
        // TODO: jwt token will be provided later so there will be limiter for user
      }
      return req.ip || "";
    },
    handler: (_req: Request, _res: Response, next: NextFunction) => {
      next(new TooManyRequests(errorConstant.TOO_MANY_REQUESTS));
    },
    skipFailedRequests: false,
    standardHeaders: true,
    legacyHeaders: false,
  });
};
