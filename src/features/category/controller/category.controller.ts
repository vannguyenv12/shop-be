import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { categoryService } from "~/services/db/category.service";

class CategoryController {
  public async create(req: Request, res: Response) {
    const category = await categoryService.add(req.body);
    return res.status(HTTP_STATUS.OK).json({
      message: 'Create category',
      data: category
    })
  }
}

export const categoryController: CategoryController = new CategoryController();