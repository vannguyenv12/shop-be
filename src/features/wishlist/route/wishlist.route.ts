import express from 'express';
import { wishlistController } from '../controller/wishlist.controller';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const wishlistRoute = express.Router();

wishlistRoute.post('/', verifyUser, wishlistController.addWishlist);
wishlistRoute.delete('/:productId', verifyUser, wishlistController.delete);


export default wishlistRoute;