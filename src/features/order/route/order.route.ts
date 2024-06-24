import express from 'express';
import { checkPermission, verifyUser } from '~/globals/middlewares/auth.middleware';
import { orderController } from '../controller/order.controller';


const orderRoute = express.Router();

orderRoute.use(verifyUser)
orderRoute.post('/', orderController.addOrder);
orderRoute.put('/:id', orderController.updateOrderStatus);


export default orderRoute;