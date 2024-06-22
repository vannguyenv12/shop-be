import { Product, ProductVariant } from "@prisma/client";
import { prisma } from "~/prisma";
import { productService } from "./product.service";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { Helper } from "~/globals/helpers/helper";

class ProductVariantService {
  public async add(productId: number, requestBody: any, currentUser: UserPayload): Promise<ProductVariant> {
    const { name } = requestBody;

    const currentProduct: Product | null = await productService.getProduct(productId);

    if (!currentProduct) {
      throw new NotFoundException(`Product has ID: ${productId} does not exist`);
    }

    Helper.checkPermission(currentProduct!, currentUser);

    const variant: ProductVariant = await prisma.productVariant.create({
      data: {
        name,
        productId
      }
    });

    return variant
  }

  public async remove(productId: number, variantId: number, currentUser: UserPayload) {

    const currentProduct: Product | null = await productService.getProduct(productId);

    if (!currentProduct) {
      throw new NotFoundException(`Product has ID: ${productId} does not exist`);
    }

    Helper.checkPermission(currentProduct!, currentUser);

    await prisma.productVariant.delete({
      where: { id: variantId }
    });


  }
}

export const productVariantService: ProductVariantService = new ProductVariantService();