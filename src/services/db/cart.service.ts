import { Cart, CartItem, Product } from "@prisma/client";
import { prisma } from "~/prisma";
import { productService } from "./product.service";
import { NotFoundException } from "~/globals/middlewares/error.middleware";

class CartService {
  public async add(requestBody: any, currentUser: UserPayload) {
    const { productId, variant } = requestBody;

    // Check product
    const product: Product | null = await productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException(`Product has ID: ${productId} not found`);
    }

    // 1) Create cart, totalPrice: 0
    const cart: Cart = await prisma.cart.create({
      data: {
        totalPrice: 0,
        userId: currentUser.id
      }
    })
    // 2) Create CartItem
    const cartItem: CartItem = await prisma.cartItem.create({
      data: {
        productId,
        variant,
        cartId: cart.id,
        price: product.price
      }
    })
    // 3) Calculate total price of cartItem, assign it to totalPrice of cart
  }
}

export const cartService: CartService = new CartService();