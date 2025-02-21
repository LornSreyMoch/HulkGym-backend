import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Workout } from "./workout.entity";

@Entity({ name: "workout_plan" })
export class WorkoutPlan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @OneToMany(() => Workout, (workout) => workout.workoutPlan, { cascade: true })
  workouts: Workout[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
