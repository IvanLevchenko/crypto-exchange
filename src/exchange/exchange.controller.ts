import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { ExchangeService } from "./exchange.service";
import { Exchange } from "./exchange.entity";
import { ExchangeCreateDto } from "./dto/exchange-create.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("exchange")
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Post("create")
  @UseGuards(AuthGuard)
  private async create(@Body() dtoIn: ExchangeCreateDto): Promise<Exchange> {
    return await this.exchangeService.create(dtoIn);
  }
}
