import { IsNumber, IsString, Matches } from "class-validator";

export abstract class AppEstimateDto {
  @IsNumber()
  inputAmount: number;

  @IsString()
  @Matches(/[A-Z]{3,}/)
  inputCurrency: string;

  @IsString()
  @Matches(/[A-Z]{3,}/)
  outputCurrency: string;
}
