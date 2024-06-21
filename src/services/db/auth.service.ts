import { User } from "@prisma/client";
import { prisma } from "~/prisma";
import jwt from 'jsonwebtoken';
import { NextFunction } from "express";
import { BadRequestException } from "~/globals/middlewares/error.middleware";

class AuthService {
  public async addUser(requestBody: any) {
    const {
      email, password, firstName, lastName, avatar
    } = requestBody;

    const newUser: User = await prisma.user.create({
      data: {
        email, password, firstName, lastName, avatar
      }
    });

    // Create JWT
    const payload = {
      email, firstName, lastName, avatar, role: newUser.role
    }

    const accessToken: string = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return accessToken;
  }
}

export const authService: AuthService = new AuthService();