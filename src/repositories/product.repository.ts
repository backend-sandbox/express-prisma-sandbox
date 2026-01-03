// import { prisma } from "../../prisma/client";
// ! just EXAMPLE APPROACH
import { Product, CreateProductData, UpdateProductData } from "../dtos";

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return [
      {
        id: 1,
        name: "Laptop",
        description: "High-performance laptop",
        price: 999.99,
        category: "Electronics",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Smartphone",
        description: "Latest smartphone model",
        price: 699.99,
        category: "Electronics",
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async findById(id: number): Promise<Product | null> {
    const products = await this.findAll();
    return products.find((p) => p.id === id) || null;
  }

  async findByCategory(category: string): Promise<Product[]> {
    const products = await this.findAll();
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  async create(data: CreateProductData): Promise<Product> {
    const newProduct: Product = {
      id: Math.floor(Math.random() * 1000) + 100,
      ...data,
      inStock: data.inStock ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newProduct;
  }

  async update(id: number, data: UpdateProductData): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) return null;

    return {
      ...product,
      ...data,
      updatedAt: new Date(),
    };
  }

  async delete(id: number): Promise<boolean> {
    const product = await this.findById(id);
    return product !== null;
  }

  async search(query: string): Promise<Product[]> {
    const products = await this.findAll();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
