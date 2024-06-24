import express from 'express';
import { checkPermission, verifyUser } from '~/globals/middlewares/auth.middleware';
import { orderController } from '../controller/order.controller';


const orderRoute = express.Router();

orderRoute.use(verifyUser)
orderRoute.post('/', orderController.addOrder);
orderRoute.get('/', orderController.getMyOrders);
orderRoute.put('/:id', checkPermission('ADMIN'), orderController.updateOrderStatus);
orderRoute.get('/:orderId/:orderItemId', orderController.getOrderItem);


export default orderRoute;