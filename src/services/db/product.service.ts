import { Product } from "@prisma/client";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class ProductService {
  public async add(requestBody: any): Promise<Product> {
    const { name, longDescription, shortDescription, quantity, main_image, categoryId } = requestBody;

    const product: Product = await prisma.product.create({
      data: {
        name, longDescription, shortDescription, quantity, main_image, categoryId
      }
    });

    return product;
  }

  public async get(): Promise<Product[]> {
    const products: Product[] = await prisma.product.findMany();
    return products;
  }

  public async getOne(id: number): Promise<Product> {
    const product: Product | null = await prisma.product.findFirst({
      where: {
        id
      }
    });

    if (!product) {
      throw new NotFoundException(`Product has ID: ${id} not found`);
    }

    return product;
  }

  public async edit(id: number, requestBody: any): Promise<Product> {
    const { name, longDescription, shortDescription, quantity, main_image, categoryId } = requestBody;

    if (await this.getCountProduct(id) <= 0) {
      throw new NotFoundException(`Product has ID: ${id} not found`)
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name, longDescription, shortDescription, quantity, main_image, categoryId
      }
    });

    return product;
  }

  private async getCountProduct(id: number): Promise<number> {
    const count: number = await prisma.product.count({
      where: { id }
    })

    return count;
  }
}

export const productService: ProductService = new ProductService();