import { ForbiddenException } from "../middlewares/error.middleware";

export class Helper {
  public static checkPermission<EntityType extends { [key: string]: any }>(entity: EntityType, entityProperty: string, currentUser: UserPayload) {
    if (currentUser.role === 'ADMIN') return;
    if (currentUser.id === entity![entityProperty]) return;

    throw new ForbiddenException('You cannot perform this action');

  }
}