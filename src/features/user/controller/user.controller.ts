import { User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "~/prisma";

class UserController {
   public async createUser(req: Request, res: Response) {
    const {
      email, password, firstName, lastName, avatar
    } = req.body;

    const isEmailUnique = true;

    if (isEmailUnique) {
      throw new Error('Email must be unique');
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