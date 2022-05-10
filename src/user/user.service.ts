import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User, Prisma } from "@prisma/client";
import { GetUsersDTO } from "./dtos/getUsers";
import { AuthService } from "src/auth/auth.service";
import CreateUserDTO from "./dtos/createUser";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users({ page, size }: GetUsersDTO): Promise<User[]> {
    return this.prisma.user.findMany({
      skip: page && size && Number(page * size),
      take: size && Number(size),
    });
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    await this.authService.createUser({
      email: data.email,
      password: data.password,
    });

    delete data.password;

    const user = await this.user({ email: data.email });
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
