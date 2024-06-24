import { Coupon } from "@prisma/client";
import { prisma } from "~/prisma";

class CouponService {
  public async get(couponCode: string) {
    const coupon: Coupon | null = await prisma.coupon.findFirst({
      where: { code: couponCode }
    })

    return coupon;
  }
}

export const couponService: CouponService = new CouponService();