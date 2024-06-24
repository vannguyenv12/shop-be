import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { orderService } from "~/services/db/order.service";

class OrderController {
  public async addOrder(req: Request, res: Response) {
    await orderService.add(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create order'
    })
  }

  public async updateOrderStatus(req: Request, res: Response) {
    await orderService.update(parseInt(req.params.id), req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Update order status'
    })
  }
}

export const orderController: OrderController = new OrderController();