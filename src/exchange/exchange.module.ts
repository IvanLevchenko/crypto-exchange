import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { ExchangeService } from "./exchange.service";
import { ExchangeController } from "./exchange.controller";
import { Exchange } from "./exchange.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Exchange]), JwtModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
