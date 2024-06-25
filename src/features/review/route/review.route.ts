import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const reviewRoute = express.Router();

reviewRoute.use(verifyUser);

reviewRoute.post('/');


export default reviewRoute;