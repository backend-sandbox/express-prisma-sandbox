import { NextFunction, Request, Response } from "express";
import * as Sentry from "@sentry/node";
import env from "../env";
import errors from "../constants/error.constant";

export function globalErrorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  void _next;
  Sentry.captureException(err);

  res.status(500).json({
    success: false,
    error: env.NODE_ENV === "development" ? err.message : errors.INTERNAL_SERVER_ERROR,
  });
}
