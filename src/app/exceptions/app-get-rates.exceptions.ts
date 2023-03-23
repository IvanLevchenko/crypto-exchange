import { HttpException, HttpStatus } from "@nestjs/common";

const useCase = "app/getRates";

class GetRatesFailed extends HttpException {
  constructor(params) {
    const message = "Getting rates failed. Check currency codes in dtoIn.";
    const response = {
      useCase,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      params,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}

class CurrencyCodesAreEqual extends HttpException {
  constructor(params) {
    const message =
      "You are using same currency codes both for base and quote currencies.";
    const response = {
      useCase,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      params,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}

export default { GetRatesFailed, CurrencyCodesAreEqual };
