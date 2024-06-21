import express from 'express';

const categoryRoute = express.Router();

categoryRoute.get('/me');

export default categoryRoute;