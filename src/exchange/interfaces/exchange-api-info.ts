export abstract class ExchangeApiInfo {
  baseUri: string;
  useCases: {
    priceBySymbol: {
      path: string;
      symbolQuery: string;
      symbolPattern: string;
    };
  };
}
