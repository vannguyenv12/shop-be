import { ProductVariantItem } from "@prisma/client";
import { prisma } from "~/prisma"

class ProductVariantItemsService {
  public async add(productId: number, variantId: number, requestBody: any, currentUser: UserPayload): Promise<ProductVariantItem> {
    const { name } = requestBody;

    const variantItem: ProductVariantItem = await prisma.productVariantItem.create({
      data: {
        name,
        variantId
      }
    });

    return variantItem;
  }

  public async remove(productId: number, variantId: number, variantItemId: number, currentUser: UserPayload) {
    await prisma.productVariantItem.delete({
      where: {
        id: variantItemId
      }
    })
  }
}

export const productVariantItemsService: ProductVariantItemsService = new ProductVariantItemsService()