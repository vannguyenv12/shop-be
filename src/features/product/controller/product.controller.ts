import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { productService } from "~/services/db/product.service";

class ProductController {
  public async create(req: Request, res: Response) {
    const product = await productService.add(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Created product',
      data: product
    })
  }
}

export const productController: ProductController = new ProductController();