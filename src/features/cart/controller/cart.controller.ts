import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { cartService } from "~/services/db/cart.service";

class CartController {
  public async addToCart(req: Request, res: Response) {
    await cartService.add(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Add to cart'
    })
  }
}

export const cartController: CartController = new CartController();