import express from 'express';
import { checkPermission, verifyUser } from '~/globals/middlewares/auth.middleware';


const couponRoute = express.Router();

couponRoute.use(verifyUser)
couponRoute.use(checkPermission('ADMIN'))
couponRoute.get('');

export default couponRoute;