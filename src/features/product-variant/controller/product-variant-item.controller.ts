import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { productVariantItemsService } from "~/services/db/product-variant-items.service";

class ProductVariantItemController {
  public async addItems(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);
    const variantId = parseInt(req.params.variantId);

    const variantItem = await productVariantItemsService.add(productId, variantId, req.body, req.currentUser);
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Add variant item',
      data: variantItem
    })
  }
}

export const productVariantItemController: ProductVariantItemController = new ProductVariantItemController();

