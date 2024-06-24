import { Coupon } from "@prisma/client";
import { ICouponBody } from "~/features/coupon/interface/coupon.interface";
import { prisma } from "~/prisma";

class CouponService {
  public async get(couponCode: string) {
    const coupon: Coupon | null = await prisma.coupon.findFirst({
      where: { code: couponCode }
    })

    return coupon;
  }

  public async add(requestBody: ICouponBody) {
    const { code, discountPrice, discountType } = requestBody;

    const coupon = await prisma.coupon.create({
      data: {
        code, discountPrice, discountType
      }
    });

    return coupon
  }
}

export const couponService: CouponService = new CouponService();