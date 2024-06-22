import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { wishlistService } from "~/services/db/wishlist.service";

class WishlistController {
  public async addWishlist(req: Request, res: Response) {
    await wishlistService.add(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Add product to wishlist successfully'
    })
  }
}

export const wishlistController: WishlistController = new WishlistController();