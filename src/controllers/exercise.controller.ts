import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Exercise } from "../entity/exercise.entity";


export const getExercise = async (req: Request, res: Response) => {
    const ExerciseRop = AppDataSource.getRepository(Exercise);

    try {
        const Exercises = await ExerciseRop.find();
        return res.status(200).json(Exercises);
    } catch (err) {
        console.error("Error getting Exercise:", err);
        return res.status(500).json({
            success: false, message: "Internal server error!"
        });
    }
}
export const UpdateExercise = async (req: Request, res: Response) => {
    const ExerciseRop = AppDataSource.getRepository(Exercise);
    const { id } = req.params;
    const updateData = req.body;
    try {
        const Exercise = await ExerciseRop.findOneBy({ id});
        if (!Exercise) {
            return res.status(404).json({ success: false, message: "Exercise  not found!" });
        }

        await ExerciseRop.update(id, updateData);
        return res.status(200).json({ success: true, message: "Exercise  updated successfully!" });
    } catch (err) {
        console.error("Error updating Exercise :", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

export const DeleteExercise = async (req: Request, res: Response) => {
    const ExerciseRop = AppDataSource.getRepository(Exercise);
    const { id } = req.params;
    try {
        const Exercise = await ExerciseRop.findOneBy({ id }); 
        if (!Exercise) {
            return res.status(404).json({ success: false, message: "Exercise  not found!" });
        }

        await ExerciseRop.remove(Exercise);
        return res.status(200).json({ success: true, message: "Exercise  deleted successfully!" });
    } catch (err) {
        console.error("Error deleting Exercise :", err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};