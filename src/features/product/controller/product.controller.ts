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

  public async read(req: Request, res: Response) {
    const products = await productService.get();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all products',
      totalCount: products.length,
      data: products
    })
  }

  public async readOne(req: Request, res: Response) {
    const product = await productService.getOne(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get single product',
      data: product
    })
  }

  public async update(req: Request, res: Response) {
    const product = await productService.edit(parseInt(req.params.id), req.body);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update product',
      data: product
    })
  }
}

export const productController: ProductController = new ProductController();