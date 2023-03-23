import { IsString, MinLength } from "class-validator";

export abstract class UserCreateDto {
  @IsString()
  login: string;

  @IsString()
  @MinLength(10)
  password: string;
}
