import { ProductImages } from "@prisma/client";
import { Express } from "express";
import { prisma } from "~/prisma";

class ProductImagesService {
  public async add(productId: number, files: Express.Multer.File[]): Promise<void> {

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

  public async remove(id: number): Promise<void> {
    await prisma.productImages.delete({
      where: { id }
    })
  }
}

export const productImagesService: ProductImagesService = new ProductImagesService();