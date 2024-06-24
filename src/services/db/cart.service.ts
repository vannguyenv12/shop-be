import { Cart, CartItem, Product, User } from "@prisma/client";
import { prisma } from "~/prisma";
import { productService } from "./product.service";
import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { userService } from "./user.service";

class CartService {
  public async add(requestBody: any, currentUser: UserPayload) {
    const { productId, variant, quantity } = requestBody;

    // Check product
    const product: Product | null = await productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException(`Product has ID: ${productId} not found`);
    }

    // If user already has a cart, don't create 
    const user: any | null = await userService.get(currentUser.id, { Cart: true });
    if (!user) {
      throw new NotFoundException(`User does not exist`);
    }

    let cart: Cart;

    if (user?.Cart?.id) {
      const existingCart: Cart | null = await this.getCart(user.Cart.id);
      if (!existingCart) {
        throw new NotFoundException(`Cart does not exist`);
      }
      cart = existingCart;
    } else {
      // 1) Create cart, totalPrice: 0
      cart = await prisma.cart.create({
        data: {
          totalPrice: 0,
          userId: currentUser.id
        }
      })
    }

    // 2) Create CartItem
    const cartItem: CartItem = await prisma.cartItem.create({
      data: {
        productId,
        variant,
        cartId: cart.id,
        price: product.price,
        quantity
      }
    })
    // 3) Calculate total price of cartItem, assign it to totalPrice of cart

    const currentCart: Cart | null = await this.getCart(cartItem.cartId);
    if (!currentCart) {
      throw new NotFoundException(`Cart does not exist`);
    }

    await prisma.cart.update({
      where: { id: cartItem.cartId },
      data: {
        totalPrice: currentCart.totalPrice + cartItem.price
      }
    });


  }

  private async getCart(cartId: number) {
    const cart: Cart | null = await prisma.cart.findFirst({
      where: { id: cartId }
    });

    return cart;
  }
}

export const cartService: CartService = new CartService();