## Description

App for getting crypto rates.


## Entities
- User - user can register & login into system. User schema:
```bash
{
  id: uuid,
  login: string,
  password: string,
}
```
- Exchange - entity with data, needed to make REST requests to them. Exchange schema:
```bash
{
  id: string, (uuid)
  name: string,
  exchangeApiInfo: {
      baseUri: string,
      useCases: {
        priceBySymbol: {
          path: string, // ex: price/get 
          symbolQuery: string,
          symbolPattern: string, // ex: "$-$", $ - currency code ($-$ = BTC-USDT)
        };
        getTrades: {
          path: string,
          symbolQuery: string,
          symbolPattern: string,
        };
      };
  }
}
```

## Use cases
User:
- user/create - create user. DtoIn:
```bash
  login: string;
  password: string;
```

- user/get - get user. DtoIn:
```bash
  id: string;
  login: string;
  // Both are optional, should be provided wethear id or login 
```

Exchange:
- exchange/create - create exchange. DtoIn:
```bash
  name: string;
  exchangeApiInfo: {
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
  };
```

- exchange/update - update exchange. DtoIn:
```bash
  id: string;
  name?: string;
  exchangeApiInfo?: {
      baseUri?: string;
      useCases?: {
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
  };
```

App use cases ("/"):
- /getRates. DtoIn:
```bash
baseCurrency: string,
quoteCurrency: string
```

- /estimate. DtoIn:
```bash
inputAmount: number,
inputCurrency: string
outputCurrency: string;
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```
