import { NextFunction, Request, Response } from "express";
import { ForbiddenException, UnAuthorizedException } from "./error.middleware";
import jwt from 'jsonwebtoken';


export function verifyUser(req: Request, res: Response, next: NextFunction) {
  if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer')) {
    throw new UnAuthorizedException('Token is invalid, please login again!');
  }

  const token = req.headers['authorization'].split(' ')[1];
  try {
    const userDecoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.currentUser = userDecoded;
    next();
  } catch (error) {
    throw new UnAuthorizedException('Token is invalid, please login again!');
  }
}

export function checkUserAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    throw new ForbiddenException('You are not logged');
  }

  next();
}