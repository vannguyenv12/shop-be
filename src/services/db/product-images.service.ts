import { ProductImages } from "@prisma/client";
import { Express } from "express";
import { prisma } from "~/prisma";

class ProductImagesService {
  public async add(productId: number, files: Express.Multer.File[]) {

    const productImages: ProductImages[] = [];

    for (const file of files) {
      productImages.push({
        image: file.filename,
        productId
      } as ProductImages);
    }

    await prisma.productImages.createMany({
      data: productImages
    })
  }
}

export const productImagesService: ProductImagesService = new ProductImagesService();