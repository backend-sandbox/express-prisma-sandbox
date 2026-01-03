import { cacheService } from "./cache.service";
import { PRODUCT_CACHE_KEYS, CACHE_CONFIG, CACHE_PATTERNS } from "../config";
import { ProductRepository } from "../repositories";
import { Product, CreateProductData, UpdateProductData } from "../dtos";

export class ProductService {
  constructor(private productRepository: ProductRepository = new ProductRepository()) {}

  async getAllProducts(): Promise<Product[]> {
    return await cacheService.cacheAside(
      PRODUCT_CACHE_KEYS.ALL_PRODUCTS,
      () => this.productRepository.findAll(),
      CACHE_CONFIG.PRODUCT.LIST,
      "all products",
    );
  }

  async getProductById(id: number): Promise<Product | null> {
    return await cacheService.cacheAside(
      PRODUCT_CACHE_KEYS.PRODUCT_BY_ID(id),
      async () => {
        const product = await this.productRepository.findById(id);
        // * Cache null results to prevent repeated queries for non-existent products
        return product;
      },
      CACHE_CONFIG.PRODUCT.INDIVIDUAL,
      `product ID: ${id}`,
    );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await cacheService.cacheAside(
      PRODUCT_CACHE_KEYS.PRODUCTS_BY_CATEGORY(category),
      () => this.productRepository.findByCategory(category),
      CACHE_CONFIG.PRODUCT.LIST,
      `category: ${category}`,
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await cacheService.cacheAside(
      PRODUCT_CACHE_KEYS.PRODUCT_SEARCH(query),
      () => this.productRepository.search(query),
      CACHE_CONFIG.PRODUCT.SEARCH,
      `search query: ${query}`,
    );
  }

  async createProduct(data: CreateProductData): Promise<Product> {
    const product = await this.productRepository.create(data);

    // * Invalidate related caches
    await this.invalidateProductCaches(product);

    console.log(`Created product and invalidated caches for product ID: ${product.id}`);
    return product;
  }

  async updateProduct(id: number, data: UpdateProductData): Promise<Product | null> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      return null;
    }

    const updatedProduct = await this.productRepository.update(id, data);
    if (!updatedProduct) {
      return null;
    }

    // * Invalidate caches for both old and new product data
    await this.invalidateProductCaches(existingProduct);
    if (data.category && data.category !== existingProduct.category) {
      // * If category changed, also invalidate new category cache
      await this.invalidateCategoryCache(data.category);
    }

    // * Update the individual product cache with new data
    await cacheService.set(
      PRODUCT_CACHE_KEYS.PRODUCT_BY_ID(id),
      updatedProduct,
      CACHE_CONFIG.PRODUCT.INDIVIDUAL,
    );

    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.productRepository.findById(id);
    if (!product) return false;

    const deleted = await this.productRepository.delete(id);
    if (!deleted) return false;

    // * Invalidate related caches
    await this.invalidateProductCaches(product);

    return true;
  }

  async productExists(id: number): Promise<boolean> {
    return await cacheService.cacheAside(
      PRODUCT_CACHE_KEYS.PRODUCT_EXISTS(id),
      async () => {
        const product = await this.productRepository.findById(id);
        return product !== null;
      },
      CACHE_CONFIG.PRODUCT.EXISTS,
      `product exists check: ${id}`,
    );
  }

  async clearAllProductCaches(): Promise<void> {
    const clearedCount = await cacheService.clearPattern(CACHE_PATTERNS.PRODUCTS);
    console.log(`Cleared ${clearedCount} product-related cache keys`);
  }

  /**
   * Invalidate all caches related to a specific product
   */
  private async invalidateProductCaches(product: Product): Promise<void> {
    const keysToDelete = [
      PRODUCT_CACHE_KEYS.PRODUCT_BY_ID(product.id),
      PRODUCT_CACHE_KEYS.PRODUCT_EXISTS(product.id),
      PRODUCT_CACHE_KEYS.ALL_PRODUCTS,
      PRODUCT_CACHE_KEYS.PRODUCTS_BY_CATEGORY(product.category),
    ];

    await cacheService.delete(keysToDelete);
    console.log(`Invalidated caches for product ID: ${product.id}`);
  }

  private async invalidateCategoryCache(category: string): Promise<void> {
    await cacheService.delete(PRODUCT_CACHE_KEYS.PRODUCTS_BY_CATEGORY(category));
    console.log(`Invalidated cache for category: ${category}`);
  }
}
