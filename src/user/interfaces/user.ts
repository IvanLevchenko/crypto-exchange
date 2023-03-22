import { ExchangeData } from "./exchange-data";

interface User {
  login: string;
  password: string;

  exchangeDataList: ExchangeData[];
}

export { User };
