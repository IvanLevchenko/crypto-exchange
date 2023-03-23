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

class ExchangeUpdateFailed extends HttpException {
  constructor(params) {
    const message = "Failed to update exchange.";
    const response = {
      useCase,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      params,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}

class ExchangeDoesNotExist extends HttpException {
  constructor(params) {
    const message = "Exchange with provided id does not exist.";
    const response = {
      useCase,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      params,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}

class ExchangeAlreadyExists extends HttpException {
  constructor(params) {
    const message = "Exchange with provided name is already exists.";
    const response = {
      useCase,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      params,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}

export default {
  ExchangeCreateFailed,
  ExchangeDoesNotExist,
  ExchangeAlreadyExists,
  ExchangeUpdateFailed,
};
