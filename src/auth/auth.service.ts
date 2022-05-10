import { Injectable, Logger } from "@nestjs/common";
import { auth } from "firebase-admin";
import { AuthUser } from "./types/user";

@Injectable()
export class AuthService {
  constructor(private logger: Logger) {}

  createUser = async (user: AuthUser) => {
    try {
      return await auth().createUser({
        ...user,
      });
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  };

  verifyUser = async (token: string) => {
    try {
      return await auth().verifyIdToken(token);
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  };
}
