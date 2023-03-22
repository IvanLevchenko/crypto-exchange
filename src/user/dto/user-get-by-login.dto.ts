import { IsString } from "class-validator";

export abstract class UserGetByLoginDto {
  @IsString()
  login: string;
}
