import { Body, Controller, Get, UseGuards } from "@nestjs/common";

import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserGetDto } from "./dto/user-get.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("get")
  @UseGuards(AuthGuard)
  private async get(@Body() dtoIn: UserGetDto): Promise<User | null> {
    return this.userService.get(dtoIn);
  }
}
