import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import createHttpError from "http-errors";

export class ProductController {
  constructor(private readonly productService: ProductService = new ProductService()) {}

  async getAllProducts(_req: Request, res: Response): Promise<void> {
    const products = await this.productService.getAllProducts();

    res.json({
      success: true,
      data: products,
      cached: true,
    });
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params["id"] ?? "");

    if (isNaN(id)) {
      throw createHttpError(400, "Invalid product ID");
    }

    const product = await this.productService.getProductById(id);

    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    res.json({
      success: true,
      data: product,
    });
  }

  async getProductsByCategory(req: Request, res: Response): Promise<void> {
    const { category } = req.params;

    if (!category || category.trim() === "") {
      throw createHttpError(400, "Category is required");
    }

    const products = await this.productService.getProductsByCategory(category);

    res.json({
      success: true,
      data: products,
      category: category,
    });
  }

  async searchProducts(req: Request, res: Response): Promise<void> {
    const query = req.query["q"] as string;

    if (!query || query.trim() === "") {
      throw createHttpError(400, "Search query is required");
    }

    const products = await this.productService.searchProducts(query);

    res.json({
      success: true,
      data: products,
      query: query,
      count: products.length,
    });
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const { name, description, price, category, inStock } = req.body;

    if (!name || !description || !price || !category) {
      throw createHttpError(400, "Missing required fields: name, description, price, category");
    }

    if (typeof price !== "number" || price <= 0) {
      throw createHttpError(400, "Price must be a positive number");
    }

    const productData = {
      name: name.trim(),
      description: description.trim(),
      price,
      category: category.trim(),
      inStock: inStock ?? true,
    };

    const product = await this.productService.createProduct(productData);

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params["id"] ?? "");

    if (isNaN(id)) {
      throw createHttpError(400, "Invalid product ID");
    }

    const updateData = req.body;

    if (
      updateData.price !== undefined &&
      (typeof updateData.price !== "number" || updateData.price <= 0)
    ) {
      throw createHttpError(400, "Price must be a positive number");
    }

    const product = await this.productService.updateProduct(id, updateData);

    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    res.json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params["id"] ?? "");

    if (isNaN(id)) {
      throw createHttpError(400, "Invalid product ID");
    }

    const deleted = await this.productService.deleteProduct(id);

    if (!deleted) {
      throw createHttpError(404, "Product not found");
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  }

  async checkProductExists(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params["id"] ?? "");

    if (isNaN(id)) {
      throw createHttpError(400, "Invalid product ID");
    }

    const exists = await this.productService.productExists(id);

    res.json({
      success: true,
      exists,
    });
  }

  async clearProductCaches(_req: Request, res: Response): Promise<void> {
    await this.productService.clearAllProductCaches();

    res.json({
      success: true,
      message: "All product caches cleared successfully",
    });
  }
}
