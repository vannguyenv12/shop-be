import { REDIS_KEY } from "~/globals/constants/redis.keys";
import RedisCache from "./redis.cache";
import { Category, Product } from "@prisma/client";

const redisCache: RedisCache = new RedisCache();

class ProductCache {
  public async getProducts(key: string) {
    console.log(key);
    const cachedProducts = await redisCache.client.GET(key);

    if (cachedProducts) {
      console.log('data from cached');
      return JSON.parse(cachedProducts) as Product[];
    }
  }

  public async saveProducts(key: string, data: Product[]) {
    await redisCache.client.SET(key, JSON.stringify(data), { EX: 5 * 60 });
  }

  public async invalidateProduct() {
    const pattern = 'products:*';
    const keys: string[] = [];

    // GET all key match with pattern
    for await (const key of redisCache.client.scanIterator({
      MATCH: pattern,
      COUNT: 100,
    })) {
      keys.push(key);
    }

    if (keys.length > 0) {
      await redisCache.client.DEL(keys);
    }
  }
}

export const productCache: ProductCache = new ProductCache();