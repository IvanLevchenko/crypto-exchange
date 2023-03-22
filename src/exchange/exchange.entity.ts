import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { ExchangeApiInfo } from "./interfaces/exchange-api-info";

@Entity()
export class Exchange {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  name: string;

  @Column({
    type: "json",
    nullable: false,
    default: {},
  })
  exchangeApiInfo: ExchangeApiInfo;
}
