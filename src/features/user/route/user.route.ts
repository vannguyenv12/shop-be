import express from 'express';
import { userController } from '../controller/user.controller';

const userRoute = express.Router();

userRoute.post('/', userController.createUser);

export default userRoute;