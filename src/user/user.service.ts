import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { GetUsersDTO } from './dtos';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: GetUsersDTO): Promise<User[]> {
    const page = Number(params.page) - 1;
    const size = Number(params.size);

    return this.prisma.user.findMany({
      skip: Number(page * size) || undefined,
      take: Number(size),
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    
    const user = await this.user({email : data.email });
    if (user) throw new ConflictException(`User already exist`);

    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
