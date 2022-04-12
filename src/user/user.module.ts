import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})

export class UserModule {}