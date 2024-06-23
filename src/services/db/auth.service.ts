import { User } from "@prisma/client";
import { prisma } from "~/prisma";
import jwt from 'jsonwebtoken';
import { NextFunction } from "express";
import { BadRequestException, ForbiddenException, NotFoundException } from "~/globals/middlewares/error.middleware";
import { IAuthLogin, IAuthRegister } from "~/features/user/interface/auth.interface";
import bcrypt from 'bcrypt';

class AuthService {
  public async addUser(requestBody: IAuthRegister) {
    const {
      email, password, firstName, lastName, avatar
    } = requestBody;

    const userByEmail: User | null = await this.getUserByEmail(email);
    if (!userByEmail) {
      throw new NotFoundException('Email must be unique');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: User = await prisma.user.create({
      data: {
        email, password: hashedPassword, firstName, lastName, avatar
      }
    });

    // Create JWT
    const payload = {
      id: newUser.id, email, firstName, lastName, avatar, role: newUser.role
    }

    const accessToken: string = this.generateJWT(payload);

    return accessToken;
  }

  public async login(requestBody: IAuthLogin) {
    // 1) Get user by email
    const user: User | null = await this.getUserByEmail(requestBody.email);
    // 2) Check email exist
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (!user.isActive) {
      throw new ForbiddenException('This account was banned');
    }

    // 3) Check password
    const isMatchPassword: boolean = await bcrypt.compare(requestBody.password, user.password);
    if (!isMatchPassword) {
      throw new BadRequestException('Invalid Credentials');
    }
    // 4) Generate JWT -> Access Token

    const payload = {
      id: user.id,
      email: user.email, firstName: user.firstName,
      lastName: user.lastName, avatar: user.avatar, role: user.role
    }
    const accessToken: string = await this.generateJWT(payload);

    return accessToken;
  }

  private async getUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  private generateJWT(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
  }

  public async isEmailAlreadyExist(email: string) {
    const userByEmail = await prisma.user.findFirst({
      where: {
        email
      }
    })

    return userByEmail != null;
  }

}

export const authService: AuthService = new AuthService();