import { User } from "@prisma/client";
import { prisma } from "~/prisma";
import bcrypt from 'bcrypt';
import { authService } from "./auth.service";
import { BadRequestException, NotFoundException } from "~/globals/middlewares/error.middleware";

class UserService {
  public async add(requestBody: any) {
    const {
      email, password, firstName, lastName, avatar
    } = requestBody;

    if (await authService.isEmailAlreadyExist(email)) {
      throw new BadRequestException('Email must be unique');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Insert To DB
    const newUser: User = await prisma.user.create({
      data: {
        email, password: hashedPassword, firstName, lastName, avatar
      }
    });

    return {
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      avatar: newUser.avatar,
      role: newUser.role,
    };
  }
}

export const userService: UserService = new UserService