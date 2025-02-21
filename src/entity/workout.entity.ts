import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { WorkoutPlan } from "./workout_plan.entity";
import { Exercise } from "./exercise.entity";

@Entity({ name: "workout" })
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: "date", nullable: false })
  date: Date;

  @ManyToOne(() => WorkoutPlan, (workoutPlan) => workoutPlan.workouts, { onDelete: "CASCADE" })
  workoutPlan: WorkoutPlan;

  @OneToMany(() => Exercise, (exercise) => exercise.workout, { cascade: true })
  exercises: Exercise[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
