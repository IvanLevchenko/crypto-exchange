import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthorizationResult } from "../common/types/authorization-result";
import { User } from "../user/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  private async login(
    @Body() dtoIn: LoginDto,
  ): Promise<AuthorizationResult | User> {
    return this.authService.login(dtoIn);
  }

  @Post("register")
  private async register(
    @Body() dtoIn: RegisterDto,
  ): Promise<AuthorizationResult | User> {
    return this.authService.register(dtoIn);
  }
}
