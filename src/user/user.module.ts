import { Logger, Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService, Logger],
  exports: [UserService],
})
export class UserModule {}
