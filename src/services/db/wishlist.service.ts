import { prisma } from "~/prisma";

class WishlistService {
  public async add(requestBody: any, currentUser: UserPayload): Promise<void> {
    const { productId } = requestBody;

    await prisma.wishlist.create({
      data: {
        productId,
        userId: currentUser.id
      }
    })
  }
}

export const wishlistService: WishlistService = new WishlistService();