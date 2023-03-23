import { registerDecorator, ValidationOptions } from "class-validator";

import { ExchangeApiInfo } from "../../exchange/interfaces/exchange-api-info";

import { Constants } from "../../constants";

export function IsExchangeApiInfo(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: "IsExchangeApiInfo",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: ExchangeApiInfo) {
          return validateInput(value);
        },
      },
    });
  };
}

function validateInput(args: ExchangeApiInfo) {
  return [args].every((arg) => {
    return (
      arg.baseUri &&
      arg.useCases &&
      typeof arg.useCases === "object" &&
      arg.useCases.priceBySymbol &&
      typeof arg.useCases.priceBySymbol === "object" &&
      arg.useCases.priceBySymbol.symbolPattern &&
      arg.useCases.priceBySymbol.path &&
      arg.useCases.priceBySymbol.symbolQuery &&
      (
        arg.useCases.priceBySymbol.symbolPattern.match(
          new RegExp(
            "\\" + Constants.Exchange.ApiInfo.symbolForCryptoCode,
            "g",
          ),
        ) || []
      ).length === 2
    );
  });
}
