import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Exchange } from "./exchange.entity";
import { ExchangeCreateDto } from "./dto/exchange-create.dto";

import Exceptions from "./exceptions/exchange-create.exceptions";

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(Exchange)
    private exchangeRepository: Repository<Exchange>,
  ) {}

  async create(dtoIn: ExchangeCreateDto): Promise<Exchange> {
    try {
      return await this.exchangeRepository.save(dtoIn);
    } catch (e) {
      throw new Exceptions.ExchangeCreateFailed({ name: dtoIn.name });
    }
  }
}
