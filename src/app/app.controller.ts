import { Body, Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { AppGetRatesDto } from "./dto/app-get-rates.dto";

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get("getRates")
  private async getRates(@Body() dtoIn: AppGetRatesDto) {
    return await this.appService.getRates(dtoIn);
  }
}
