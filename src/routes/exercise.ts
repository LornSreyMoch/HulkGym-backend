import { Router } from "express";
import { getExercise,UpdateExercise,DeleteExercise} from "../controllers/exercise.controller";
import protectRoute from "../middleware/auth";

const router = Router();

router.get("/exercise" , getExercise);
router.put("/update",UpdateExercise);
router.delete("/delete",DeleteExercise);
export default router;
