import { Cart } from "@prisma/client";
import { cartService } from "./cart.service";
import { prisma } from "~/prisma";

class OrderService {
  public async add(requestBody: any, currentUser: UserPayload) {
    const { couponCode, addressId } = requestBody;

    // Get all cart items in my cart
    const cart: any | null = await cartService.getMyCart(currentUser);
    // Create a Order

    const newOrder = await prisma.order.create({
      data: {
        addressId,
        totalPrice: 0,
        status: 'pending',
        userId: currentUser.id
      }
    })

    // Loop through the cart items and add it to orderItem
    const orderItems = [];
    let totalQuantity: number = 0;

    for (const cartItem of cart.cartItems) {
      orderItems.push({
        orderId: newOrder.id,
        productId: cartItem.productId,
        variant: cartItem.variant,
        price: cartItem.price,
        quantity: cartItem.quantity,
      });

      totalQuantity += cartItem.quantity
    }

    await prisma.orderItem.createMany({
      data: orderItems
    })

    // Clear carts
    cartService.clear(cart.id, currentUser);

    // update total price of order
    await prisma.order.update({
      where: { id: newOrder.id },
      data: {
        totalQuantity: totalQuantity,
        totalPrice: cart.totalPrice
      }
    })

  }
}

export const orderService: OrderService = new OrderService();