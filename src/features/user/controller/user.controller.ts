import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class UserController {
   public async createUser(req: Request, res: Response, next: NextFunction) {
    const {
      email, password, firstName, lastName, avatar
    } = req.body;

    const isEmailUnique = true;

    if (isEmailUnique) {
      return next(new BadRequestException('Email must be unique'))
    }

    // {
    //   status: 'error',
    //   statusCode: 400,
    //   message: 'Email must be unque'
    // }

    // Insert To DB
    const newUser: User = await prisma.user.create({
      data: {
        email, password, firstName, lastName, avatar
      }
    });

    res.status(201).json(newUser); // CREATED

  }
}

export const userController: UserController = new UserController();