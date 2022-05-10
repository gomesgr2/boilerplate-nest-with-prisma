import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import CreateUserDTO from "./dtos/createUser";
import { GetUsersDTO } from "./dtos/getUsers";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() params: GetUsersDTO): Promise<User[]> {
    try {
      return await this.userService.users(params);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO): Promise<User> {
    try {
      return await this.userService.createUser(user);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException("Something went wrong");
    }
  }
}
