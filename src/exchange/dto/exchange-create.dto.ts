import { IsString } from "class-validator";
import { ExchangeApiInfo } from "../interfaces/exchange-api-info";
import { Type } from "class-transformer";

import { IsExchangeApiInfo } from "../../common/decorators/is-exchange-api-info";

export class ExchangeCreateDto {
  @IsString()
  name: string;

  @IsExchangeApiInfo({
    message:
      "Incorrect exchangeApiInfo. Example: { 'baseUri': 'https://my-api.com/', 'useCases': { 'priceBySymbol': { 'path': 'some/useCase', 'symbolQuery': 'symbol', 'symbolPattern': $-$ } } }",
  })
  @Type(() => ExchangeApiInfo)
  exchangeApiInfo: ExchangeApiInfo;
}
