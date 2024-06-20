import { User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "~/prisma";
import { userSchemaCreate } from "../schema/user.schema";

class UserController {
   public async createUser(req: Request, res: Response) {
    const {
      email, password, firstName, lastName, avatar
    } = req.body;

    const {error} = userSchemaCreate.validate(req.body);

    if (error) {
      console.log(error);
      return;
    }

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