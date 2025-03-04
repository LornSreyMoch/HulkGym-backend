import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserInfo } from "./user.entity"; // Ensure this is the correct entity name

@Entity({ name: "coupons" })
export class Coupon {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100, unique: true, nullable: false })
  code: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "date", nullable: false })
  validUntil: Date;

  @Column({ type: "int", default: 1 })
  maxUsage: number;

  @ManyToMany(() => UserInfo, (user) => user.coupons)
  @JoinTable()
  claimedBy: UserInfo[]; // Updated to match UserInfo

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
