import { Category } from "@prisma/client";
import { ICategoryBody } from "~/features/category/interface/category.interface";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";
import RedisCache from "../cache/redis.cache";

const redisCache: RedisCache = new RedisCache();

class CategoryService {
  public async add(requestBody: ICategoryBody): Promise<Category> {
    const { name, icon } = requestBody;

    const category: Category = await prisma.category.create({
      data: {
        name, icon
      }
    })

    return category;
  }

  public async read(): Promise<Category[]> {
    // Have you have a categories in redis?
    // If yes, return it from a cache
    // If no, fetch it in database
    //     - Save it to redis

    const cachedCategories = await redisCache.client.GET('categories');

    if (cachedCategories) {
      console.log('This is a data from cached');
      return JSON.parse(cachedCategories);
    }

    const categories: Category[] = await prisma.category.findMany({
      where: {
        status: true
      }
    });

    await redisCache.client.SET('categories', JSON.stringify(categories));

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

  public async edit(id: number, requestBody: ICategoryBody) {
    const { name, icon } = requestBody;

    if (await this.getCountCategory(id) <= 0) {
      throw new NotFoundException(`Category with ID: ${id} not found`);
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id,
        status: true
      },
      data: {
        name, icon
      }
    });


    return updatedCategory
  }

  public async remove(id: number) {
    if (await this.getCountCategory(id) <= 0) {
      throw new NotFoundException(`Category with ID: ${id} not found`);
    }

    await prisma.category.delete({
      where: {
        id,
      }
    });
  }

  private async getCountCategory(id: number): Promise<number> {
    const count = await prisma.category.count({
      where: {
        id,
        status: true
      }
    });

    return count
  }
}

export const categoryService: CategoryService = new CategoryService();