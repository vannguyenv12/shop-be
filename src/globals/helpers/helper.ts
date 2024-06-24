import { Coupon } from "@prisma/client";
import { ForbiddenException } from "../middlewares/error.middleware";

export class Helper {
  public static checkPermission<EntityType extends { [key: string]: any }>(entity: EntityType, entityProperty: string, currentUser: UserPayload) {
    if (currentUser.role === 'ADMIN') return;
    if (currentUser.id === entity![entityProperty]) return;

    throw new ForbiddenException('You cannot perform this action');

  }

  public static getDiscountPrice(coupon: Coupon, totalOrderPrice: number) {
    let discount: number = 0;
    if (coupon.discountType === 'PERCENT') {
      discount = totalOrderPrice * (coupon.discountPrice / 100); // 100$ * 0.5
    } else if (coupon.discountType === 'VALUE') {
      discount = totalOrderPrice - coupon.discountPrice
    };

    return totalOrderPrice - discount;
  }
}