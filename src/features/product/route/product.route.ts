import express from 'express';
import { validateSchema } from '~/globals/middlewares/validate.middleware';
import { productController } from '../controller/product.controller';
import { productSchema } from '../schema/product.schema';

const productRoute = express.Router();

productRoute.post('/', validateSchema(productSchema), productController.create);
productRoute.get('/', productController.read);
productRoute.get('/:id', productController.readOne);
productRoute.put('/:id', validateSchema(productSchema), productController.update);
productRoute.delete('/:id', productController.delete);

export default productRoute;