import { HTTP_STATUS } from "../constants/http";

export abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;

  constructor(message: string) {
    super(message)
  }
}

export class BadRequestException extends CustomError {
  status: string = 'error';
  statusCode: number = HTTP_STATUS.BAD_REQUEST;

  constructor(message: string) {
    super(message)
  }
}

export class UnAuthorizedException extends CustomError {
  status: string = 'error';
  statusCode: number = HTTP_STATUS.UNAUTHORIZED;

  constructor(message: string) {
    super(message)
  }
}

export class ForbiddenException extends CustomError {
  status: string = 'error';
  statusCode: number = HTTP_STATUS.FORBIDDEN;

  constructor(message: string) {
    super(message)
  }
}

export class NotFoundException extends CustomError {
  status: string = 'error';
  statusCode: number = HTTP_STATUS.NOT_FOUND;

  constructor(message: string) {
    super(message)
  }
}


