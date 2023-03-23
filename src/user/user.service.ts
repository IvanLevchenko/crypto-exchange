import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { UserCreateDto } from "./dto/user-create.dto";
import { UserGetByLoginDto } from "./dto/user-get-by-login.dto";
import { UserGetDto } from "./dto/user-get.dto";
import { User } from "./user.entity";

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

  async get(dtoIn: UserGetDto): Promise<User | null> {
    return await this.userRepository.findOneBy({ ...dtoIn });
  }
}
