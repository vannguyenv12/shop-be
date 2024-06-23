import express from 'express';
import { userController } from '../controller/user.controller';
import { validateSchema, } from '~/globals/middlewares/validate.middleware';
import { userSchemaCreate, userSchemaUpdate } from '../schema/user.schema';
import { asyncWrapper } from '~/globals/middlewares/error.middleware';
import { checkPermission, preventInActiveUser, verifyUser } from '~/globals/middlewares/auth.middleware';

const userRoute = express.Router();

userRoute.use(verifyUser)
userRoute.use(preventInActiveUser)

userRoute.post('/', checkPermission('ADMIN'), validateSchema(userSchemaCreate), userController.createUser);
userRoute.put('/:id', validateSchema(userSchemaUpdate), userController.update);
userRoute.delete('/:id', userController.delete);
userRoute.get('/me', userController.getMe);

export default userRoute;