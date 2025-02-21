import { Router } from "express";
import { getWorkout,UpdateWorkout,DeleteWorkout} from "../controllers/workout.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.get("/workout" , getWorkout);
router.put("/workout",UpdateWorkout);
router.delete("/delete",DeleteWorkout);
export default router;
