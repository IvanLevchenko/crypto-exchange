import { IsArray, IsString, MinLength } from "class-validator";

export abstract class RegisterDto {
  @IsString()
  login: string;

  @MinLength(10, {
    message: "Password should be at least 10 characters length.",
  })
  @IsString({ message: "Password should be a string." })
  password: string;

  @IsArray()
  exchangeDataList: [
    {
      exchangeName: string;
      apiKey: string;
      secretKey?: string;
    },
  ];
}
