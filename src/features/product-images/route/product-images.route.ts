import express from 'express';
import { productImagesController } from '../controller/product-images.controller';
import { upload } from '~/globals/helpers/upload';

const productImagesRoute = express.Router();

productImagesRoute.post('/:productId', upload.array('images', 10), productImagesController.addImages);


export default productImagesRoute;