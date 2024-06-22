import express from 'express';

const wishlistRoute = express.Router();

wishlistRoute.post('/:productId')


export default wishlistRoute;