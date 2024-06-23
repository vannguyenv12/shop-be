import express from 'express';
import { addressController } from '../controller/address.controller';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const addressRoute = express.Router();


addressRoute.use(verifyUser)
addressRoute.post('/', addressController.addAddress);
addressRoute.delete('/:id', addressController.delete);
addressRoute.get('/me', addressController.getMyAddress);

export default addressRoute;