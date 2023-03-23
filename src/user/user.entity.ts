import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  login: string;

  @Column({ nullable: false })
  password: string;
}
