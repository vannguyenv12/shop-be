import { Wishlist } from "@prisma/client";
import { IWishlistBody } from "~/features/wishlist/interface/wishlist.interface";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class WishlistService {
  public async add(requestBody: IWishlistBody, currentUser: UserPayload): Promise<void> {
    const { productId } = requestBody;

    // check 
    const wishlist = await this.getWishlist(productId, currentUser.id);

    if (wishlist) {
      throw new BadRequestException(`This product with ID ${productId} already exist!`);
    }


    await prisma.wishlist.create({
      data: {
        productId,
        userId: currentUser.id
      }
    })
  }

  private async getWishlist(productId: number, userId: number): Promise<Wishlist | null> {
    const wishlist: Wishlist | null = await prisma.wishlist.findFirst({
      where: {
        productId,
        userId
      }
    });

    return wishlist
  }
}

export const wishlistService: WishlistService = new WishlistService();