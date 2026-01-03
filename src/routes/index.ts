import { Router } from "express";
import { exampleRouter } from "./example.route";
import { productRouter } from "./product.route";

const router = Router();

router.use("/example", exampleRouter);
router.use("/products", productRouter);

export default router;
