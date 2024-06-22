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

  public async delete(req: Request, res: Response) {
    await wishlistService.remove(parseInt(req.params.productId), req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Product was removed form wishlist'
    })
  }
}

export const wishlistController: WishlistController = new WishlistController();