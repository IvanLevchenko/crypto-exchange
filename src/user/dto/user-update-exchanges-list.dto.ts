import { IsArray, IsBoolean, IsOptional, IsUUID } from "class-validator";

export abstract class UserUpdateExchangesListDto {
  @IsUUID()
  id: string;

  @IsArray()
  exchangeDataList: [
    {
      exchangeName: string;
      apiKey: string;
    },
  ];

  @IsOptional()
  @IsBoolean()
  forceUpdating: boolean;
}
