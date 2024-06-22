import { ProductVariant } from "@prisma/client";
import { prisma } from "~/prisma";

class ProductVariantService {
  public async add(productId: number, requestBody: any): Promise<ProductVariant> {
    const { name } = requestBody;

    const variant: ProductVariant = await prisma.productVariant.create({
      data: {
        name,
        productId
      }
    });

    return variant
  }

  public async remove(productId: number, variantId: number) {
    await prisma.productVariant.delete({
      where: { id: variantId }
    });


  }
}

export const productVariantService: ProductVariantService = new ProductVariantService();