import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MembershipPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column("text", { array: true }) // Use "simple-array" only if using PostgreSQL
  features: string[];

  @Column("decimal", { precision: 10, scale: 2 }) // Ensure proper decimal handling
  price: number;

  @Column()
  duration_days: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
