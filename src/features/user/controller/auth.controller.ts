import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { authService } from "~/services/db/auth.service";

class AuthController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {

    if (await authService.isEmailAlreadyExist(req.body.email)) {
      next(new BadRequestException('Email must be unique'));
      return;
    }

    const accessToken = await authService.addUser(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: 'User registered successfully!',
      accessToken
    });
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = await authService.login(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: 'User login successfully!',
      accessToken
    });
  }
}

export const authController: AuthController = new AuthController();