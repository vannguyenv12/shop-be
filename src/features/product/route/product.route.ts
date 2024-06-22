import express from 'express';
import { validateSchema } from '~/globals/middlewares/validate.middleware';
import { productController } from '../controller/product.controller';
import { productSchema } from '../schema/product.schema';
import { checkPermission, verifyUser } from '~/globals/middlewares/auth.middleware';
import { upload } from '~/globals/helpers/upload';

const productRoute = express.Router();

productRoute.post('/', verifyUser, checkPermission('SHOP', 'ADMIN'), validateSchema(productSchema), upload.single('main_image'), productController.create);
productRoute.get('/', productController.read);
productRoute.get('/:id', productController.readOne);
productRoute.put('/:id', verifyUser, checkPermission('SHOP', 'ADMIN'), validateSchema(productSchema), productController.update);
productRoute.delete('/:id', verifyUser, checkPermission('SHOP', 'ADMIN'), productController.delete);

export default productRoute;