import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "./error.middleware";
import jwt from 'jsonwebtoken';


export function verifyUser(req: Request, res: Response, next: NextFunction) {
  if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer')) {
    throw new UnAuthorizedException('Token is invalid, please login again!');
  }

  const token = req.headers['authorization'].split(' ')[1];
  console.log(token);


  const decoded = jwt.verify(token, process.env.JWT_SECRET!);


}