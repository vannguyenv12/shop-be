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


  public async getProduct(key: string) {
    const cachedProduct = await redisCache.client.HGETALL(key);

    const cachedProductObject = { ...cachedProduct };

    if (Object.keys(cachedProductObject).length) {
      console.log('product in cache');
      const dataToReturn = {
        ...cachedProductObject,
        createdAt: new Date(cachedProductObject.createdAt),
        shopId: Number(cachedProductObject.shopId),
        price: Number(cachedProductObject.price),
        id: Number(cachedProductObject.id),
        updatedAt: new Date(cachedProductObject.updatedAt),
        categoryId: Number(cachedProductObject.categoryId),
        quantity: Number(cachedProductObject.quantity),
        productImages: JSON.parse(cachedProductObject.productImages),
        productVariants: JSON.parse(cachedProductObject.productVariants),
      }
      console.log(dataToReturn)
      return dataToReturn;
    }
  }

  public async saveProduct(key: string, data: Product) {


    const dataToRedis = {
      ...data,
      shopId: data.shopId ? `${data.shopId}` : '',
      createdAt: `${data.createdAt}`,
      updatedAt: `${data.updatedAt}`,
      // @ts-ignore
      productImages: data.productImages.length ?
        // @ts-ignore
        JSON.stringify(data.productImages) :
        JSON.stringify([]),
      // @ts-ignore
      productVariants: data.productVariants.length ?
        // @ts-ignore
        JSON.stringify(data.productVariants) :
        JSON.stringify([])
    }

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisCache.client.HSET(key, field, value);
    }
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