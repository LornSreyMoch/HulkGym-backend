import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { MembershipPlan } from "../entity/membership.entity";

// Create MembershipPlan
export const createMembershipPlan = async (req: Request, res: Response) => {
  const memberShipPlanRepository = AppDataSource.getRepository(MembershipPlan);
  
  const { username, features, price, duration_days } = req.body;
  console.log("BODY", req.body);

  try {
    const newMembershipPlan = memberShipPlanRepository.create({
      username,
      features,
      price,
      duration_days,
    });

    console.log(newMembershipPlan);
    const savedData = await memberShipPlanRepository.save(newMembershipPlan);
    console.log(savedData, "saved data");

    return res.status(201).json({ 
      message: "MembershipPlan created successfully", 
      membershipPlan: savedData 
    });

  } catch (err) {
    console.error("Error creating membership plan:", err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};



//GET 
export const getMembershipPlans = async (req: Request, res: Response) => {
  const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);

  try {
    const membershipPlans = await membershipPlanRepository.find();
    return res.status(200).json({ success: true, membershipPlans });
  } catch (err) {
    console.error("Error fetching membership plans:", err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};


// GET by ID
export const getMembershipPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);

  try {
    const membershipPlan = await membershipPlanRepository.findOne({ where: { id: Number(id) } });

    if (!membershipPlan) {
      return res.status(404).json({ success: false, message: "Membership plan not found!" });
    }

    return res.status(200).json({ success: true, membershipPlan });
  } catch (err) {
    console.error("Error fetching membership plan:", err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};


// DELETE
export const deleteMembershipPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);

  try {
    const membershipPlan = await membershipPlanRepository.findOne({ where: { id: Number(id) } });

    if (!membershipPlan) {
      return res.status(404).json({ success: false, message: "Membership plan not found!" });
    }

    await membershipPlanRepository.remove(membershipPlan);

    return res.status(200).json({ success: true, message: "Membership plan deleted successfully!" });
  } catch (err) {
    console.error("Error deleting membership plan:", err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};




//Update
export const updateMembershipPlan = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10); // Convert ID to  number

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid membership plan ID!" });
  }

  const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);
  const { username, features, price, duration_days } = req.body;

  try {
    const membershipPlan = await membershipPlanRepository.findOne({ where: { id } });

    if (!membershipPlan) {
      return res.status(404).json({ success: false, message: "Membership plan not found!" });
    }

    // Update the membership plan with new values
    membershipPlan.username = username ?? membershipPlan.username;
    membershipPlan.features = features ?? membershipPlan.features;
    membershipPlan.price = price ?? membershipPlan.price;
    membershipPlan.duration_days = duration_days ?? membershipPlan.duration_days;

    const updatedPlan = await membershipPlanRepository.save(membershipPlan);

    return res.status(200).json({ 
      success: true, 
      message: "Membership plan updated successfully!", 
      membershipPlan: updatedPlan 
    });

  } catch (err) {
    console.error("Error updating membership plan:", err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
