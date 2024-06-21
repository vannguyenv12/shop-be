import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";
import { authService } from "~/services/db/auth.service";

class AuthController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = await authService.addUser(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: 'User registered successfully!',
      accessToken
    });
  }
}

export const authController: AuthController = new AuthController();