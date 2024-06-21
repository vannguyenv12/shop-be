import express from 'express';
import { userController } from '../controller/user.controller';
import { validateSchema, } from '~/globals/middlewares/validate.middleware';
import { userSchemaCreate } from '../schema/user.schema';
import { asyncWrapper } from '~/globals/middlewares/error.middleware';

const userRoute = express.Router();

userRoute.post('/', validateSchema(userSchemaCreate), asyncWrapper(userController.createUser));

export default userRoute;