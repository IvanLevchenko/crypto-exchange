import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "nestjs-http-promise";
import { JwtModule } from "@nestjs/jwt";

import { User } from "../user/user.entity";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { ExchangeModule } from "../exchange/exchange.module";
import { Exchange } from "../exchange/exchange.entity";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    JwtModule,
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Exchange]),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Exchange],
      synchronize: true,
    }),
    AppModule,
    AuthModule,
    UserModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
