import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { WorkoutPlan } from "../entity/workout_plan.entity";
import { Workout } from "../entity/workout.entity";
import { Exercise } from "../entity/exercise.entity";

export const CreateWorkoutPlan = async (req: Request, res: Response) => {
    const WorkoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const WorkoutRepository = AppDataSource.getRepository(Workout);
    const ExerciseRepository = AppDataSource.getRepository(Exercise);

    const { name, workouts } = req.body;
    console.log(req.body, "insert");
    if (!name || !workouts || !Array.isArray(workouts) || workouts.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid input data!" });
    }

    try {
        const workoutPlan = WorkoutPlanRepository.create({ name });
        const savedWorkoutPlan = await WorkoutPlanRepository.save(workoutPlan);
        console.log("savedWorkoutPlan", savedWorkoutPlan);

        for (const workout of workouts) {
            if (!workout.name || !workout.exercises || !Array.isArray(workout.exercises)) {
                continue;
            }
            console.log("workout", workout);
            const newWorkout = WorkoutRepository.create({
                name: workout.name,
                date: new Date(),
                workoutPlan: savedWorkoutPlan
            });

            const savedWorkout = await WorkoutRepository.save(newWorkout);
            console.log("savedWorkout", savedWorkout);

            for (const exercise of workout.exercises) {
                if (!exercise.name || !exercise.sets || !exercise.reps) {
                    continue;
                }


                const newExercise = ExerciseRepository.create({
                    name: exercise.name,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    weight: exercise.weight || null,
                    caloriesBurned: exercise.caloriesBurned || 0,
                    workout: savedWorkout
                });

                const savedExercise = await ExerciseRepository.save(newExercise);
                console.log("savedExercise", savedExercise);
            }
        }

        return res.status(201).json({ message: "Workout plan created successfully", workoutPlan: savedWorkoutPlan });

    } catch (err) {
        console.error("Error creating workout plan:", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

export const getWorkPlans = async (req: Request, res: Response) => {
    const WorkoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);

    try {
        const workoutPlans = await WorkoutPlanRepository.find();
        return res.status(200).json(workoutPlans);
    } catch (err) {
        console.error("Error getting workout plans:", err);
        return res.status(500).json({
            success: false, message: "Internal server error!"
        });
    }
}
export const UpdateWorkoutPlan = async (req: Request, res: Response) => {
    const WorkoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const { id } = req.params;
    const updateData = req.body;
    try {
        const workoutPlan = await WorkoutPlanRepository.findOneBy({ id});
        if (!workoutPlan) {
            return res.status(404).json({ success: false, message: "Workout plan not found!" });
        }

        await WorkoutPlanRepository.update(id, updateData);
        return res.status(200).json({ success: true, message: "Workout plan updated successfully!" });
    } catch (err) {
        console.error("Error updating workout plan:", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

export const DeleteWorkoutPlan = async (req: Request, res: Response) => {
    const WorkoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
    const { id } = req.params;
    try {
        const workoutPlan = await WorkoutPlanRepository.findOneBy({ id }); 
        if (!workoutPlan) {
            return res.status(404).json({ success: false, message: "Workout plan not found!" });
        }

        await WorkoutPlanRepository.remove(workoutPlan);
        return res.status(200).json({ success: true, message: "Workout plan deleted successfully!" });
    } catch (err) {
        console.error("Error deleting workout plan:", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};