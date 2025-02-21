import { Router } from "express";
import { createMembershipPlan, getMembershipPlans, getMembershipPlanById, deleteMembershipPlan, updateMembershipPlan } from "../controllers/membershipPlan_controller";
// import protectRoute from "../middleware/auth";

const router = Router();

router.post("/create",  createMembershipPlan);
router.get("/get",  getMembershipPlans);
router.get("/get/:id", getMembershipPlanById );
router.delete("/delete/:id", deleteMembershipPlan);
router.put("/update/:id", updateMembershipPlan);




export default router;
