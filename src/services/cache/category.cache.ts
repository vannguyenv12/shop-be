import { REDIS_KEY } from "~/globals/constants/redis.keys";
import RedisCache from "./redis.cache";
import { Category } from "@prisma/client";

const redisCache: RedisCache = new RedisCache();

class CategoryCache {
  public async getCategories() {
    const cachedCategories = await redisCache.client.GET(REDIS_KEY.CATEGORIES);

    if (cachedCategories) {
      console.log('This is a data from cached');
      return JSON.parse(cachedCategories) as Category;
    }
  }

  public async getCategory(id: number) {
    const cachedCategory = await redisCache.client.HGETALL(`${REDIS_KEY.CATEGORIES}:${id}`);

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

  }

  public async saveCategory(data: Category, id: number) {
    const dataToRedis = {
      id: data.id.toString(),
      name: data.name,
      icon: data.icon,
      status: data.status ? "true" : "false"
    }

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisCache.client.HSET(`${REDIS_KEY.CATEGORIES}:${id}`, field, value)
    }
  }

  public async saveCategories(data: Category[]) {
    await redisCache.client.SET(REDIS_KEY.CATEGORIES, JSON.stringify(data), {
      EX: 60 * 60 * 60
    });
  }

  public async invalidate() {
    await redisCache.client.DEL(REDIS_KEY.CATEGORIES) // delete key in redis

  }
}

export const categoryCache: CategoryCache = new CategoryCache();