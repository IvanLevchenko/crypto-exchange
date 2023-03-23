import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Exchange } from "./exchange.entity";
import { ExchangeCreateDto } from "./dto/exchange-create.dto";
import { ExchangeUpdateDto } from "./dto/exchange-update.dto";

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

  async update(dtoIn: ExchangeUpdateDto): Promise<Exchange> {
    const exchange = await this.exchangeRepository.findOneBy({ id: dtoIn.id });

    if (!exchange) {
      throw new Exceptions.ExchangeDoesNotExist({ id: dtoIn.id });
    }

    if (dtoIn.name) {
      const isNameAlreadyInUse = await this.exchangeRepository.findOneBy({
        name: dtoIn.name,
      });

      if (isNameAlreadyInUse) {
        throw new Exceptions.ExchangeAlreadyExists({ name: dtoIn.name });
      }
    }

    try {
      return await this.exchangeRepository.save(dtoIn);
    } catch (e) {
      throw new Exceptions.ExchangeUpdateFailed({});
    }
  }
}
