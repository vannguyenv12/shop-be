import express from 'express';
import { productVariantController } from '../controller/product-variant.controller';

const productVariantRoute = express.Router();

productVariantRoute.post('/:productId', productVariantController.addVariants)
productVariantRoute.delete('/:productId/:variantId', productVariantController.delete)


export default productVariantRoute;