import { Router } from "express";
import { CreateWorkoutPlan, getWorkPlans,UpdateWorkoutPlan,DeleteWorkoutPlan} from "../controllers/workout_plan.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.post("/create", CreateWorkoutPlan);
router.get("/plan" , getWorkPlans);
router.put("/update",UpdateWorkoutPlan);
router.delete("/delete",DeleteWorkoutPlan);
export default router;
