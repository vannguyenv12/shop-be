declare namespace Express {
  export interface Request {
    currentUser: UserPayload;
  }
}

interface UserPayload {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
}