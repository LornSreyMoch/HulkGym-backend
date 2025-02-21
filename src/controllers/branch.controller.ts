import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Branch } from "../entity/branch.entity";

export const create = async (req: Request, res: Response) => {
    try {
        const branchRepo = AppDataSource.getRepository(Branch);
        const { name, location, phone_number, image } = req.body;

        if (!name || !location || !phone_number || !image) {
            return res.status(400).json({ message: "Name, location, and phone number image are required" });
        }

        const branch = new Branch();
        branch.name = name;
        branch.location = location;
        branch.phone_number = phone_number;
        branch.image = image;

        await branchRepo.save(branch);

        return res.status(201).json({
            message: "Branch created successfully",
            branch: {
                name: branch.name,
                location: branch.location,
                phone_number: branch.phone_number,
                image: branch.image,
            }
        });
    } catch (err) {
        console.error("Error creating branch:", err);
        return res.status(500).json({ message: "Something went wrong." });
    }
};


export const getBranchs = async (req: Request, res: Response) => {
    try {
        const branchRepo = AppDataSource.getRepository(Branch);
        const branches = await branchRepo.find();
        return res.status(200).json(branches);
    } catch (err) {
        console.error("Error getting branches:", err);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const branchRepo = AppDataSource.getRepository(Branch);
        const branchId = req.params.id;
        const branch = await branchRepo.findOneBy({ id: branchId });
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        return res.status(200).json(branch);
    } catch (err) {
        console.error("Error getting branch:", err);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const branchRepo = AppDataSource.getRepository(Branch);
        const { name, location, phone_number, image } = req.body;
        const branchId = req.params.id;
        const branch = await branchRepo.findOneBy({ id: branchId });
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        if (name) branch.name = name;
        if (location) branch.location = location;
        if (phone_number) branch.phone_number = phone_number;
        if (image) branch.image = image;
        await branchRepo.save(branch);
        return res.status(200).json({
            message: "Branch updated successfully",
            branch: {
                name: branch.name,
                location: branch.location,
                phone_number: branch.phone_number,
                image: branch.image

                }
        });
    } catch (err) {
        console.error("Error updating branch:", err);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
        
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const branchRepo = AppDataSource.getRepository(Branch);
        const branchId = req.params.id;
        const branch = await branchRepo.findOneBy({ id:
            branchId });
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        await branchRepo.delete(branch);
        return res.status(200).json({ message: "Branch deleted successfully" });
        } catch (err) {
            console.error("Error deleting branch:", err);
            return res.status(500).json({ message: "Something went wrong." });
    }
}