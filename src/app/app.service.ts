import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpService } from "nestjs-http-promise";

import { Exchange } from "../exchange/exchange.entity";
import { AppGetRatesDto } from "./dto/app-get-rates.dto";
import { AppEstimateDto } from "./dto/app-estimate.dto";
import { CurrencyPriceData } from "./interfaces/currency-price-data";
import { Currencies } from "./interfaces/currencies";
import { AppEstimateDtoOut } from "./dto/app-estimate.dtoOut";

import { Constants } from "../constants";
import Exceptions from "./exceptions/app-get-rates.exceptions";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Exchange)
    private exchangeRepository: Repository<Exchange>,
    private readonly httpService: HttpService,
  ) {}

  async getRates(
    dtoIn: AppGetRatesDto,
  ): Promise<Awaited<CurrencyPriceData[]> | undefined> {
    const exchanges = await this.exchangeRepository.find();
    const currencies = {
      baseCurrency: dtoIn.baseCurrency,
      quoteCurrency: dtoIn.quoteCurrency,
    };

    if (!exchanges) {
      return;
    }

    if (dtoIn.quoteCurrency === dtoIn.baseCurrency) {
      throw new Exceptions.CurrencyCodesAreEqual({ ...dtoIn });
    }

    if (!Constants.QuoteCurrenciesList.includes(dtoIn.quoteCurrency)) {
      currencies.baseCurrency = dtoIn.quoteCurrency;
      currencies.quoteCurrency = dtoIn.baseCurrency;
    }

    return await this.getCurrenciesPrices(exchanges, currencies);
  }

  async estimate(
    dtoIn: AppEstimateDto,
  ): Promise<AppEstimateDtoOut | undefined> {
    const exchanges = await this.exchangeRepository.find();
    const currencies = {
      baseCurrency: dtoIn.inputCurrency,
      quoteCurrency: dtoIn.outputCurrency,
    };

    if (!exchanges) {
      return;
    }

    if (dtoIn.inputCurrency === dtoIn.outputCurrency) {
      throw new Exceptions.CurrencyCodesAreEqual({ ...dtoIn });
    }

    if (!Constants.QuoteCurrenciesList.includes(dtoIn.outputCurrency)) {
      currencies.baseCurrency = dtoIn.outputCurrency;
      currencies.quoteCurrency = dtoIn.inputCurrency;
    }

    const currenciesPrices = await this.getCurrenciesPrices(
      exchanges,
      currencies,
    );

    const currenciesPricesWithInputAmount = currenciesPrices.map(
      (currencyData: CurrencyPriceData) => {
        const rate = (
          Number(currencyData.rate) * dtoIn.inputAmount
        ).toPrecision();

        return {
          exchangeName: currencyData.exchangeName,
          rate: String(rate),
        };
      },
    );

    let estimatedObject = {
      exchangeName: currenciesPricesWithInputAmount[0].exchangeName,
      outputAmount: currenciesPricesWithInputAmount[0].rate,
    };

    currenciesPricesWithInputAmount.forEach((currencyObject) => {
      if (Number(estimatedObject.outputAmount) > Number(currencyObject.rate)) {
        estimatedObject = {
          exchangeName: currencyObject.exchangeName,
          outputAmount: currencyObject.rate,
        };
      }
    });

    return estimatedObject;
  }

  private async getCurrenciesPrices(
    exchanges: Exchange[],
    currencies: Currencies,
  ) {
    let switchedCodes = false;
    const rates: CurrencyPriceData[] = [];

    for (const exchange of exchanges) {
      const url = new URL(exchange.exchangeApiInfo.baseUri);
      const priceBySymbolData = exchange.exchangeApiInfo.useCases.priceBySymbol;
      const path = priceBySymbolData.path;

      url.pathname += url.pathname.at(-1) === "/" ? path : `/${path}`;

      const params = this.getQueryParamsByPattern(
        currencies,
        priceBySymbolData.symbolQuery,
        priceBySymbolData.symbolPattern,
      );

      let currencyInfo;
      try {
        currencyInfo = await this.httpService.get(url.toString(), { params });
        if (!currencyInfo.data.data && !currencyInfo.data?.price) {
          currencyInfo = await this.makeRequestWithSwitchedCodes(
            currencies,
            url.toString(),
            priceBySymbolData.symbolQuery,
            priceBySymbolData.symbolPattern,
          );
          switchedCodes = true;
        }
      } catch (e) {
        currencyInfo = await this.makeRequestWithSwitchedCodes(
          currencies,
          url.toString(),
          priceBySymbolData.symbolQuery,
          priceBySymbolData.symbolPattern,
        );
        switchedCodes = true;
      }

      rates.push({
        exchangeName: exchange.name,
        rate: this.getRate(
          currencyInfo.data.price || currencyInfo.data?.data?.price,
          switchedCodes,
        ),
      });
    }

    return rates;
  }

  private getQueryParamsByPattern(
    currencies: Currencies,
    symbolQuery: string,
    symbolPattern: string,
    initialParams?: object,
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
          currencies.baseCurrency,
        );
      } else {
        params[symbolQuery] = params[symbolQuery].replace(
          symbolForCryptoCode,
          currencies.quoteCurrency,
        );
      }
    }

    return { ...params, ...initialParams };
  }

  private async makeRequestWithSwitchedCodes(
    currencies: AppGetRatesDto,
    url: string,
    symbolQuery: string,
    symbolPattern: string,
    initialParams?: object,
  ) {
    const switchedCurrencies = {
      baseCurrency: currencies.quoteCurrency,
      quoteCurrency: currencies.baseCurrency,
    };
    const params = this.getQueryParamsByPattern(
      switchedCurrencies,
      symbolQuery,
      symbolPattern,
    );

    let currencyInfo;
    try {
      currencyInfo = await this.httpService.get(url.toString(), {
        params: { ...params, ...initialParams },
      });
    } catch (e) {
      throw new Exceptions.GetRatesFailed({ ...currencies });
    }

    return currencyInfo;
  }

  private getRate(rate: string, switched: boolean) {
    if (!switched) {
      return rate;
    }

    return String((1 / Number(rate)).toPrecision());
  }
}
