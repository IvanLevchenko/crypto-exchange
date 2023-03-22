import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { User } from "./interfaces/User";
import { UserService } from "./user.service";
import { UserUpdateExchangesListDto } from "./dto/user-update-exchanges-list.dto";
import { UserGetDto } from "./dto/user-get.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}
  @Patch("updateExchangesList")
  @UseGuards(AuthGuard)
  private async updateExchangesList(
    @Body() dtoIn: UserUpdateExchangesListDto,
  ): Promise<User | HttpException> {
    return this.userService.updateExchangesList(dtoIn);
  }

  @Get("get")
  @UseGuards(AuthGuard)
  private async get(@Body() dtoIn: UserGetDto): Promise<User | null> {
    return this.userService.get(dtoIn);
  }

  @Get("list")
  @UseGuards(AuthGuard)
  private async list(): Promise<User[] | []> {
    return this.userService.list();
  }
}
