import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';


const orderRoute = express.Router();

orderRoute.use(verifyUser)
orderRoute.post('/');


export default orderRoute;