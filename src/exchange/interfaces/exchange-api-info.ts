export abstract class ExchangeApiInfo {
  baseUri: string;
  useCases: {
    priceBySymbol: {
      path: string;
      symbolHeader?: any;
      symbolPattern: string;
    };
  };
}
