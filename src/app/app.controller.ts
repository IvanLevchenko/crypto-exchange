import { Body, Controller, Get, UseGuards } from "@nestjs/common";

import { AppService } from "./app.service";
import { AppGetRatesDto } from "./dto/app-get-rates.dto";
import { AppEstimateDto } from "./dto/app-estimate.dto";
import { AuthGuard } from "../auth/auth.guard";
import { AppEstimateDtoOut } from "./dto/app-estimate.dtoOut";
import { CurrencyPriceData } from "./interfaces/currency-price-data";

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get("getRates")
  @UseGuards(AuthGuard)
  private async getRates(
    @Body() dtoIn: AppGetRatesDto,
  ): Promise<Awaited<CurrencyPriceData[]> | undefined> {
    return await this.appService.getRates(dtoIn);
  }

  @Get("estimate")
  @UseGuards(AuthGuard)
  private async estimate(
    @Body() dtoIn: AppEstimateDto,
  ): Promise<AppEstimateDtoOut | undefined> {
    return await this.appService.estimate(dtoIn);
  }
}
