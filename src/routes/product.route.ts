import { Router } from "express";
import { ProductController } from "../controllers";
import { catchHandler } from "../middlewares/catch.middleware";

export const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", catchHandler(productController.getAllProducts.bind(productController)));

productRouter.get(
  "/search",
  catchHandler(productController.searchProducts.bind(productController)),
);

productRouter.get(
  "/category/:category",
  catchHandler(productController.getProductsByCategory.bind(productController)),
);

productRouter.get(
  "/:id/exists",
  catchHandler(productController.checkProductExists.bind(productController)),
);

productRouter.get("/:id", catchHandler(productController.getProductById.bind(productController)));

productRouter.post("/", catchHandler(productController.createProduct.bind(productController)));

productRouter.put("/:id", catchHandler(productController.updateProduct.bind(productController)));

productRouter.delete("/:id", catchHandler(productController.deleteProduct.bind(productController)));

productRouter.delete(
  "/cache/clear",
  catchHandler(productController.clearProductCaches.bind(productController)),
);
