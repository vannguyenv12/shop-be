import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class ReviewService {
  public async add(requestBody: any, currentUser: UserPayload) {
    // 1) Make sure user already bought product
    const { productId, rating, comment } = requestBody;

    const orders = await prisma.order.findMany({
      where: {
        userId: currentUser.id,
        orderItems: {
          some: {
            productId
          }
        }
      }
    });

    if (orders.length === 0) {
      throw new BadRequestException(`You does not buy this product`);
    }

    // 2) Create a review
    const review = await prisma.review.create({
      data: {
        productId, comment, rating, userId: currentUser.id
      }
    });

    return review;

  }
}

export const reviewService: ReviewService = new ReviewService();