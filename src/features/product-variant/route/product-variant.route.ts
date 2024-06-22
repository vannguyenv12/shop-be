import express from 'express';
import { productVariantController } from '../controller/product-variant.controller';

const productVariantRoute = express.Router();

productVariantRoute.post('/:productId', productVariantController.addVariants)


export default productVariantRoute;