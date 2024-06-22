import { Product, ProductVariant } from "@prisma/client";
import { prisma } from "~/prisma";
import { productService } from "./product.service";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { Helper } from "~/globals/helpers/helper";
import { IProduct, IProductVariantBody } from "~/features/product-variant/interface/product-variant.interface";

class ProductVariantService {
  public async add(productId: number, requestBody: IProductVariantBody, currentUser: UserPayload): Promise<ProductVariant> {
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

    const product: IProduct | null = await prisma.product.findFirst({
      where: { id: productId },
      include: {
        productVariants: true
      }
    })

    const index = product!.productVariants.findIndex((variant: ProductVariant) => variant.id === variantId);

    if (index <= -1) {
      throw new NotFoundException(`Product variant has ID: ${variantId} does not exist`);

    }

    await prisma.productVariant.delete({
      where: { id: variantId }
    });
  }
}

export const productVariantService: ProductVariantService = new ProductVariantService();