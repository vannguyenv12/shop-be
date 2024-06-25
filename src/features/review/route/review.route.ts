import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';
import { reviewController } from '../controller/review.controller';

const reviewRoute = express.Router();

reviewRoute.get('/avg/:id', reviewController.getAvg);
reviewRoute.use(verifyUser);

reviewRoute.post('/', reviewController.addReview);
reviewRoute.put('/:id', reviewController.updateReview);
reviewRoute.delete('/:id', reviewController.deleteReview);


export default reviewRoute;