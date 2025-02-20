import Router from 'express';
import { create, getBranchs ,getBranchById , update, deleteBranch} from '../controllers/branch.controller';

const router = Router();

router.post("/create", create);
router.get("/get", getBranchs);
router.get("/get/:id", getBranchById);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteBranch);

export default router;
