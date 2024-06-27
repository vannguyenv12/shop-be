import { Product } from "@prisma/client";
import { Express } from "express";
import { IProductBody } from "~/features/product/interface/product.interface";
import { REDIS_KEY } from "~/globals/constants/redis.keys";
import { UtilsConstant } from "~/globals/constants/utils";
import { Helper } from "~/globals/helpers/helper";
import { checkPermission } from "~/globals/middlewares/auth.middleware";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";
import { productCache } from "../cache/product.cache";

class ProductService {
  public async add(requestBody: IProductBody, currentUser: UserPayload, mainImage: Express.Multer.File | undefined): Promise<Product> {
    const { name, longDescription, shortDescription, quantity, categoryId, price } = requestBody;

    const product: Product = await prisma.product.create({
      data: {
        name, longDescription, shortDescription, quantity: parseInt(quantity),
        main_image: mainImage?.filename ? mainImage.filename : '',
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        shopId: currentUser.id
      }
    });

    await productCache.invalidateProduct();

    return product;
  }

  public async get(): Promise<Product[]> {
    const products: Product[] = await prisma.product.findMany();
    return products;
  }

  public async getPagination(
    page: number = UtilsConstant.DEFAULT_PAGE,
    pageSize: number = UtilsConstant.DEFAULT_PAGE_SIZE,
    sortBy: string = UtilsConstant.DEFAULT_SORT_BY,
    sortDir: string = UtilsConstant.DEFAULT_SORT_DIR,
    where = {},
  ) {
    const productKey = `${REDIS_KEY.PRODUCTS}:${page}:${pageSize}:${sortBy}:${sortDir}`;
    await productCache.getProducts(productKey);

    // page 1, every page has 5 products
    const skip: number = (page - 1) * pageSize; // (3 - 1) * 10 = 20
    const take: number = pageSize;

    const products: Product[] = await prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortDir
      }
    });

    // Save to redis
    await productCache.saveProducts(productKey, products);

    return products;
  }

  public async getOne(id: number): Promise<Product> {
    await productCache.getProduct(`${REDIS_KEY.PRODUCTS}:${id}`);

    const product: Product | null = await prisma.product.findFirst({
      where: {
        id
      },
      include: {
        productImages: true,
        productVariants: {
          include: {
            productVariantItems: true
          }
        }
      }
    });

    if (!product) {
      throw new NotFoundException(`Product has ID: ${id} not found`);
    }

    await productCache.saveProduct(`${REDIS_KEY.PRODUCTS}:${id}`, product);

    return product;
  }

  public async edit(id: number, requestBody: IProductBody, currentUser: UserPayload): Promise<Product> {
    const { name, longDescription, shortDescription, quantity, main_image, categoryId, price } = requestBody;

    if (await this.getCountProduct(id) <= 0) {
      throw new NotFoundException(`Product has ID: ${id} not found`)
    }

    const currentProduct = await this.getProduct(id);
    Helper.checkPermission(currentProduct!, 'shopId', currentUser);


    const product = await prisma.product.update({
      where: { id },
      data: {
        name, longDescription, shortDescription, quantity: parseInt(quantity), main_image, categoryId: parseInt(categoryId), price: parseFloat(price)
      }
    });

    return product;
  }

  public async remove(id: number, currentUser: UserPayload) {
    if (await this.getCountProduct(id) <= 0) {
      throw new NotFoundException(`Product has ID: ${id} not found`)
    }

    const currentProduct = await this.getProduct(id);
    Helper.checkPermission(currentProduct!, 'shopId', currentUser);

    await prisma.product.delete({
      where: { id }
    })
  }

  public async getMyProduct(currentUser: UserPayload) {
    const products = await prisma.user.findMany({
      where: {
        id: currentUser.id
      },
      include: {
        products: true
      }
    });

    return products
  }

  public async getProduct(id: number): Promise<Product | null> {
    const product: Product | null = await prisma.product.findFirst({
      where: { id }
    })

    if (!product) return null;

    return product;
  }

  private async getCountProduct(id: number): Promise<number> {
    const count: number = await prisma.product.count({
      where: { id }
    })

    return count;
  }
}

export const productService: ProductService = new ProductService();