import { Coupon } from "@prisma/client";
import { ICouponBody } from "~/features/coupon/interface/coupon.interface";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
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

  public async getAll() {
    const coupons: Coupon[] = await prisma.coupon.findMany();

    return coupons;
  }

  public async getOne(code: string) {
    const coupon: Coupon | null = await prisma.coupon.findFirst({
      where: { code }
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon ${code} not found`);
    }

    return coupon;
  }
}

export const couponService: CouponService = new CouponService();