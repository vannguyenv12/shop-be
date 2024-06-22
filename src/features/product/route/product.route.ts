import express from 'express';
import { validateSchema } from '~/globals/middlewares/validate.middleware';
import { productController } from '../controller/product.controller';

const productRoute = express.Router();

productRoute.post('/', productController.create);

export default productRoute;