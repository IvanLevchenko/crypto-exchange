import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  login: string;

  @Column("text", { unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
}
