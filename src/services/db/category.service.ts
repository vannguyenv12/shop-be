import { Category } from "@prisma/client";
import { prisma } from "~/prisma";

class CategoryService {
  public async add(requestBody: any): Promise<Category> {
    const { name, icon } = requestBody;

    const category: Category = await prisma.category.create({
      data: {
        name, icon
      }
    })

    return category;
  }
}

export const categoryService: CategoryService = new CategoryService();