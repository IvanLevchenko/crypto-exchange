import { HttpException, HttpStatus } from "@nestjs/common";

const useCase = "exchange/create";

class ExchangeCreateFailed extends HttpException {
  constructor(params) {
    const message =
      "Creating of exchange failed. Maybe you are trying to create exchange with existing name in database. Name of exchange entity has to be unique.";
    const response = {
      useCase,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      params,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}

export default { ExchangeCreateFailed };
