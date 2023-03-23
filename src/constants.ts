enum QuoteCurrencies {
  BTC = "BTC",
  USDT = "USDT",
  ETH = "ETH",
  BNB = "BNB",
}

export const Constants = Object.freeze({
  apiPrefix: "api/v1",

  Exchange: {
    ApiInfo: {
      symbolForCryptoCode: "$",
    },
  },

  QuoteCurrenciesList: [...Object.keys(QuoteCurrencies)],
});
