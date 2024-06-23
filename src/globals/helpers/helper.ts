import { Address, Product } from "@prisma/client";
import { ForbiddenException } from "../middlewares/error.middleware";

export class Helper {
  public static checkPermission(entity: any, entityProperty: string, currentUser: UserPayload) {
    if (currentUser.role === 'ADMIN') return;
    if (currentUser.id === entity![entityProperty]) return;

    throw new ForbiddenException('You cannot perform this action');

  }
}