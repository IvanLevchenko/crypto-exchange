export abstract class ExchangeApiInfo {
  baseUri: string;
  useCases: {
    priceBySymbol: {
      path: string;
      symbolQuery: string;
      symbolPattern: string;
    };
    getTrades: {
      path: string;
      symbolQuery: string;
      symbolPattern: string;
    };
  };
}
