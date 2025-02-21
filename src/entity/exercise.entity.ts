import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workout } from "./workout.entity";

@Entity({ name: "exercise" })
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: "int", nullable: false })
  sets: number;

  @Column({ type: "varchar", nullable: true,default: null})
  weight: string; 

  @Column({ type: "varchar", nullable: false })
  reps: string;

  @Column({ type: "int", nullable: true, default: 0 })
  caloriesBurned: number;

  @ManyToOne(() => Workout, (workout) => workout.exercises, { onDelete: "CASCADE" })
  workout: Workout;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
