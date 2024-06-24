import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';
import { orderController } from '../controller/order.controller';


const orderRoute = express.Router();

orderRoute.use(verifyUser)
orderRoute.post('/', orderController.addOrder);


export default orderRoute;