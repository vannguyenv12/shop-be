import express from 'express';
import { productImagesController } from '../controller/product-images.controller';
import { upload } from '~/globals/helpers/upload';
import { checkPermission, verifyUser } from '~/globals/middlewares/auth.middleware';

const productImagesRoute = express.Router();

productImagesRoute.post('/:productId', verifyUser, checkPermission('ADMIN', 'SHOP'), upload.array('images', 10), productImagesController.addImages);
productImagesRoute.delete('/:productId/:imageId', verifyUser, checkPermission('ADMIN', 'SHOP'), productImagesController.delete);


export default productImagesRoute;