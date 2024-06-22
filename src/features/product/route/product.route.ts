import express from 'express';
import { validateSchema } from '~/globals/middlewares/validate.middleware';

const productRoute = express.Router();

productRoute.post('/');

export default productRoute;