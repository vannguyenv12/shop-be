import express from 'express';
import { validateSchema } from '~/globals/middlewares/validate.middleware';
import { productController } from '../controller/product.controller';

const productRoute = express.Router();

productRoute.post('/', productController.create);
productRoute.get('/', productController.read);
productRoute.get('/:id', productController.readOne);
productRoute.put('/:id', productController.update);

export default productRoute;