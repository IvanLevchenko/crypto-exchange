import { HttpException, HttpStatus } from "@nestjs/common";

const useCase = "user/updateExchangesList";

class UserDoesNotExists extends HttpException {
  constructor(params) {
    const message = "User with provided id does not exist.";
    const response = {
      useCase,
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      params,
    };
    super(response, HttpStatus.BAD_REQUEST);
  }
}

export default { UserDoesNotExists };
