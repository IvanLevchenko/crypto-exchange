import { Body, Controller, Post, Patch, UseGuards } from "@nestjs/common";

import { ExchangeService } from "./exchange.service";
import { Exchange } from "./exchange.entity";
import { ExchangeCreateDto } from "./dto/exchange-create.dto";
import { AuthGuard } from "../auth/auth.guard";
import { ExchangeUpdateDto } from "./dto/exchange-update.dto";

@Controller("exchange")
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Post("create")
  @UseGuards(AuthGuard)
  private async create(@Body() dtoIn: ExchangeCreateDto): Promise<Exchange> {
    return await this.exchangeService.create(dtoIn);
  }

  @Patch("update")
  @UseGuards(AuthGuard)
  private async update(@Body() dtoIn: ExchangeUpdateDto): Promise<Exchange> {
    return await this.exchangeService.create(dtoIn);
  }
}
