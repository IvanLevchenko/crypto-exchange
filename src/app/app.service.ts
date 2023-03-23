import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpService } from "nestjs-http-promise";

import { Exchange } from "../exchange/exchange.entity";
import { AppGetRatesDto } from "./dto/app-get-rates.dto";

import { Constants } from "../constants";
import Exceptions from "./exceptions/app-get-rates.exceptions";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Exchange)
    private exchangeRepository: Repository<Exchange>,
    private readonly httpService: HttpService,
  ) {}

  private getQueryParamsByPattern(
    dtoIn: AppGetRatesDto,
    symbolQuery: string,
    symbolPattern: string,
  ) {
    const symbolForCryptoCode = Constants.Exchange.ApiInfo.symbolForCryptoCode;
    const symbolsForCryptoCodeAmount = (
      symbolPattern.match(
        new RegExp("\\" + Constants.Exchange.ApiInfo.symbolForCryptoCode, "g"),
      ) || []
    ).length;

    const params = {
      [symbolQuery]: symbolPattern,
    };

    for (let i = 0; i < symbolsForCryptoCodeAmount; i++) {
      if (i === 0) {
        params[symbolQuery] = symbolPattern.replace(
          symbolForCryptoCode,
          dtoIn.baseCurrency,
        );
      } else {
        params[symbolQuery] = params[symbolQuery].replace(
          symbolForCryptoCode,
          dtoIn.quoteCurrency,
        );
      }
    }

    return params;
  }

  async getRates(
    dtoIn: AppGetRatesDto,
  ): Promise<Awaited<object[]> | undefined> {
    const exchanges = await this.exchangeRepository.find();

    if (!exchanges) {
      return;
    }

    const pendingRequests = exchanges.map((exchange) => {
      const url = new URL(exchange.exchangeApiInfo.baseUri);
      const priceBySymbolData = exchange.exchangeApiInfo.useCases.priceBySymbol;
      const path = priceBySymbolData.path;

      url.pathname += url.pathname.at(-1) === "/" ? path : `/${path}`;

      const params = this.getQueryParamsByPattern(
        dtoIn,
        priceBySymbolData.symbolQuery,
        priceBySymbolData.symbolPattern,
      );

      return this.httpService.get(url.toString(), { params });
    });

    let awaitedResponse;
    try {
      awaitedResponse = await Promise.all(pendingRequests);
    } catch (e) {
      throw new Exceptions.GetRatesFailed({ ...dtoIn });
    }

    return awaitedResponse.map((response) => {
      const requestBaseUri = new URL(response.config.url).host;
      const exchange = exchanges.find((exchange) =>
        exchange.exchangeApiInfo.baseUri.includes(requestBaseUri),
      );
      return {
        rate: response.data.price || response.data.data?.price,
        exchangeName: exchange?.name,
      };
    });
  }
}
