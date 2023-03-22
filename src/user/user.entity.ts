import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsArray } from "class-validator";

import { ExchangeData } from "./interfaces/exchange-data";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  login: string;

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  @IsArray()
  exchangeDataList: ExchangeData[];

  @Column({ nullable: false })
  password: string;
}
