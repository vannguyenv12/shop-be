import { Category } from "@prisma/client";
import { ICategoryBody } from "~/features/category/interface/category.interface";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";
import RedisCache from "../cache/redis.cache";
import { REDIS_KEY } from "~/globals/constants/redis.keys";

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
    const cachedCategories = await redisCache.client.GET(REDIS_KEY.CATEGORIES);

    if (cachedCategories) {
      console.log('This is a data from cached');
      return JSON.parse(cachedCategories);
    }

    const categories: Category[] = await prisma.category.findMany({
      where: {
        status: true
      }
    });

    await redisCache.client.SET(REDIS_KEY.CATEGORIES, JSON.stringify(categories), {
      EX: 60 * 60 * 60
    });

    return categories;
  }

  public async readOne(id: number): Promise<Category> {
    const cachedCategory = await redisCache.client.HGETALL(`categories:${id}`);

    const cachedCategoryObject = { ...cachedCategory };

    if (Object.keys(cachedCategoryObject).length) {
      console.log('cached category', cachedCategoryObject);

      const dataToReturn = {
        id: parseInt(cachedCategoryObject.id),
        name: cachedCategoryObject.name,
        icon: cachedCategoryObject.icon,
        status: cachedCategoryObject.status === 'true'
      } as Category

      return dataToReturn;
    }

    const category = await prisma.category.findFirst({
      where: {
        id,
        status: true
      }
    })

    if (!category) {
      throw new NotFoundException(`Category with ID: ${id} not found`);
    }

    // Save data to redis

    const dataToRedis = {
      id: category.id.toString(),
      name: category.name,
      icon: category.icon,
      status: category.status ? "true" : "false"
    }

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisCache.client.HSET(`categories:${id}`, field, value)
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