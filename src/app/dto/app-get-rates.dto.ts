import { IsString, Matches } from "class-validator";

export abstract class AppGetRatesDto {
  @IsString()
  @Matches(/[A-Z]{3,}/)
  baseCurrency: string;

  @IsString()
  @Matches(/[A-Z]{3,}/)
  quoteCurrency: string;
}
