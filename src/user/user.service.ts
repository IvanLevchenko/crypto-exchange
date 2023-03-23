import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { UserCreateDto } from "./dto/user-create.dto";
import { UserGetByLoginDto } from "./dto/user-get-by-login.dto";
import { UserUpdateExchangesListDto } from "./dto/user-update-exchanges-list.dto";
import { UserGetDto } from "./dto/user-get.dto";
import { User } from "./user.entity";
import { ExchangeData } from "./interfaces/exchange-data";

import Exceptions from "./exceptions/user-update-exchanges-list.exceptions";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(dtoIn: UserCreateDto): Promise<User> {
    return this.userRepository.save(dtoIn);
  }

  async getByLogin(dtoIn: UserGetByLoginDto): Promise<User | null> {
    return await this.userRepository.findOneBy({ login: dtoIn.login });
  }

  async updateExchangesList(
    dtoIn: UserUpdateExchangesListDto,
  ): Promise<User | HttpException> {
    const user = await this.userRepository.findOneBy({ id: dtoIn.id });

    if (!user) {
      throw new Exceptions.UserDoesNotExists({ id: dtoIn.id });
    }

    const payload = { ...user };

    if (dtoIn.forceUpdating) {
      payload.exchangeDataList = dtoIn.exchangeDataList;
    } else {
      const exchangeNamesInDto = dtoIn.exchangeDataList.map(
        (exchangeData) => exchangeData.exchangeName,
      );

      const alreadyExistingExchanges = user.exchangeDataList.filter(
        (exchangeData) => {
          return exchangeNamesInDto.map(
            (exchangeName) => exchangeName === exchangeData.exchangeName,
          );
        },
      );

      const exchangeDataList: ExchangeData[] = [];

      dtoIn.exchangeDataList.forEach((exchangeData) => {
        const alreadyExists = alreadyExistingExchanges.find(
          (existingExchangeData) =>
            existingExchangeData.exchangeName === exchangeData.exchangeName,
        );

        if (!alreadyExists) {
          exchangeDataList.push(exchangeData);
        }
      });

      payload.exchangeDataList = [
        ...user.exchangeDataList,
        ...exchangeDataList,
      ];
    }

    return await this.userRepository.save(payload);
  }

  async get(dtoIn: UserGetDto): Promise<User | null> {
    return await this.userRepository.findOneBy({ ...dtoIn });
  }
}
