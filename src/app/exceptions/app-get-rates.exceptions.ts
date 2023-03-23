import { HttpException, HttpStatus } from "@nestjs/common";

const useCase = "app/getRates";

class GetRatesFailed extends HttpException {
  constructor(params) {
    const message =
      "Getting rates failed. Possibly you are trying to get rates with non-existing currency codes. If codes are correct, try to switch baseCurrency and quoteCurrency.";
    const response = {
      useCase,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      params,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}

export default { GetRatesFailed };
