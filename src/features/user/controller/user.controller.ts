import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { userService } from "~/services/db/user.service";

class UserController {
  public async createUser(req: Request, res: Response, next: NextFunction) {


    const newUser = await userService.add(req.body);
    res.status(HTTP_STATUS.CREATED).json(newUser); // CREATED
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    return res.status(HTTP_STATUS.OK).json(req.currentUser)
  }

}

export const userController: UserController = new UserController();