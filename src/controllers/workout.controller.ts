import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Workout } from "../entity/workout.entity";


export const getWorkout = async (req: Request, res: Response) => {
    const WorkoutRep = AppDataSource.getRepository(Workout);

    try {
        const workouts = await WorkoutRep.find();
        return res.status(200).json(workouts);
    } catch (err) {
        console.error("Error getting workout plans:", err);
        return res.status(500).json({
            success: false, message: "Internal server error!"
        });
    }
}
export const UpdateWorkout = async (req: Request, res: Response) => {
    const WorkoutRep = AppDataSource.getRepository(Workout);
    const { id } = req.params;
    const updateData = req.body;
    try {
        const workoutPlan = await WorkoutRep.findOneBy({ id});
        if (!workoutPlan) {
            return res.status(404).json({ success: false, message: "Workout plan not found!" });
        }

        await WorkoutRep.update(id, updateData);
        return res.status(200).json({ success: true, message: "Workout plan updated successfully!" });
    } catch (err) {
        console.error("Error updating workout plan:", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

export const DeleteWorkout = async (req: Request, res: Response) => {
    const WorkoutRep = AppDataSource.getRepository(Workout);
    const { id } = req.params;
    try {
        const workoutPlan = await WorkoutRep.findOneBy({ id }); 
        if (!workoutPlan) {
            return res.status(404).json({ success: false, message: "Workout plan not found!" });
        }

        await WorkoutRep.remove(workoutPlan);
        return res.status(200).json({ success: true, message: "Workout plan deleted successfully!" });
    } catch (err) {
        console.error("Error deleting workout plan:", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};