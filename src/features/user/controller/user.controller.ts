import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { InternalException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class UserController {
  public async createUser(req: Request, res: Response, next: NextFunction) {
    const {
      email, password, firstName, lastName, avatar
    } = req.body;

    // Insert To DB
    const newUser: User = await prisma.user.create({
      data: {
        email, password, firstName, lastName, avatar
      }
    });

    res.status(201).json(newUser); // CREATED
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    return res.status(HTTP_STATUS.OK).json(req.currentUser)
  }

}

export const userController: UserController = new UserController();