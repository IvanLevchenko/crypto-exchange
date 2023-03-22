import { IsOptional, IsString, IsUUID, ValidateIf } from "class-validator";

export abstract class UserGetDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @ValidateIf((dtoIn) => !dtoIn.id)
  @IsString()
  login: string;
}
