import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import errors from "../constants/error.constant";

export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      res.status(400).json({ success: false, error: errors.INVALID_DATA, details: errorMessages });
      return;
    }

    // Setting query, body and params in case schema has z.coerce

    if (result.data["query"] !== undefined) {
      req.query = result.data["query"];
    }

    if (result.data["body"] !== undefined) {
      req.body = result.data["body"];
    }

    if (result.data["params"] !== undefined) {
      req.params = result.data["params"];
    }

    next();
  };
}
