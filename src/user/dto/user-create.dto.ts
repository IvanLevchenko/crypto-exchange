import { IsArray, IsString, MinLength } from "class-validator";
import { ExchangeData } from "../interfaces/exchange-data";

export abstract class UserCreateDto {
  @IsString()
  login: string;

  @IsString()
  @MinLength(10)
  password: string;

  @IsArray()
  exchangeDataList: ExchangeData[];
}
