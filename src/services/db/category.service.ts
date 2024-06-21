import { Category } from "@prisma/client";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
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

  public async read(): Promise<Category[]> {
    const categories: Category[] = await prisma.category.findMany({
      where: {
        status: true
      }
    });

    return categories;
  }

  public async readOne(id: number): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: {
        id,
        status: true
      }
    })

    if (!category) {
      throw new NotFoundException(`Category with ID: ${id} not found`);
    }

    return category;

  }
}

export const categoryService: CategoryService = new CategoryService();