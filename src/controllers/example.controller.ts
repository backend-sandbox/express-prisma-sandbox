import { Request, Response } from "express";
import { ExampleSchema } from "../validators/example.validator";
import { example } from "../services/example.service";
import { toExample } from "../dtos/example.dto";

export async function get(req: Request, res: Response): Promise<void> {
  const { id } = req.query as unknown as ExampleSchema["query"];
  const result = await example.get(id);

  res.json({
    success: true,
    data: toExample(result),
  });
}
