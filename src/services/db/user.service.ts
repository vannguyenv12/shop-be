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

    return this.returnUser(newUser);

  }

  public async edit(id: number, requestBody: any, currentUser: UserPayload) {
    const { firstName, lastName, avatar } = requestBody;

    const user: User = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        avatar
      }
    });

    return this.returnUser(user);

  }

  public async remove(id: number, currentUser: UserPayload) {
    // User cannot be delete
    await prisma.user.update({
      where: { id },
      data: { isActive: false }
    })
  }

  private returnUser(user: User) {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
    };
  }
}

export const userService: UserService = new UserService