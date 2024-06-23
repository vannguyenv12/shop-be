import express from 'express';
import { userController } from '../controller/user.controller';
import { validateSchema, } from '~/globals/middlewares/validate.middleware';
import { userSchemaCreate, userSchemaUpdate } from '../schema/user.schema';
import { asyncWrapper } from '~/globals/middlewares/error.middleware';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const userRoute = express.Router();

userRoute.post('/', validateSchema(userSchemaCreate), userController.createUser);
userRoute.put('/:id', verifyUser, validateSchema(userSchemaUpdate), userController.update);
userRoute.delete('/:id', verifyUser, userController.delete);
userRoute.get('/me', verifyUser, userController.getMe);

export default userRoute;