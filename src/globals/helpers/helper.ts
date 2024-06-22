import { Product } from "@prisma/client";
import { ForbiddenException } from "../middlewares/error.middleware";

export class Helper {
  public static checkPermission(product: Product, currentUser: UserPayload) {
    if (currentUser.role === 'ADMIN') return;
    if (currentUser.id === product!.shopId) return;

    throw new ForbiddenException('You cannot perform this action');

  }
}