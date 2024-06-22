import express from 'express';
import { checkPermission, verifyUser } from '~/globals/middlewares/auth.middleware';
import { productVariantItemController } from '../controller/product-variant-item.controller';

const productVariantItemRoute = express.Router();

productVariantItemRoute.post('/:productId/:variantId', verifyUser, checkPermission('ADMIN', 'SHOP'), productVariantItemController.addItems);
productVariantItemRoute.delete('/:productId/:variantId/:variantItemId', verifyUser, checkPermission('ADMIN', 'SHOP'), productVariantItemController.delete);


export default productVariantItemRoute;