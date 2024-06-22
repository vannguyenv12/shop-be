import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { productImagesService } from "~/services/db/product-images.service";

class ProductImagesController {
  public async addImages(req: Request, res: Response) {
    const productId: number = parseInt(req.params.productId);

    const files = req.files as Express.Multer.File[];
    await productImagesService.add(productId, files);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Add images to product'
    })
  }
}

export const productImagesController: ProductImagesController = new ProductImagesController();