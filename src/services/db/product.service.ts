import { Product } from "@prisma/client";
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
}

export const productService: ProductService = new ProductService();