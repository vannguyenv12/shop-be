import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';
import { reviewController } from '../controller/review.controller';

const reviewRoute = express.Router();

reviewRoute.use(verifyUser);

reviewRoute.post('/', reviewController.addReview);


export default reviewRoute;