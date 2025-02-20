import { Request, Response } from 'express';
import { AppDataSource } from '../config';
import { BranchContact } from '../entity/branchContact.entity';
import { Branch } from '../entity/branch.entity';

export const create = async (req: Request, res: Response) => {
    try {
        const branchContactRepo = AppDataSource.getRepository(BranchContact);
        const branchRepo = AppDataSource.getRepository(Branch);

        const { phone, branchId } = req.body;

        if (!phone || !branchId) {
            return res.status(400).json({ message: 'Phone, and branchId are required.' });
        }


        const branch = await branchRepo.findOneBy({ id: branchId });

        if (!branch) {
            return res.status(404).json({ message: 'Branch not found.' });
        }


        const branchContact = branchContactRepo.create({
            phone,
            branch
        });


        await branchContactRepo.save(branchContact);

        return res.status(201).json({
            message: 'Branch contact created successfully.',
            branchContact: {
                id: branchContact.id,
                phone: branchContact.phone,
                branchId: branch.id,
            },
        });

    } catch (err) {
        console.error('Error creating branch contact:', err);
        return res.status(500).json({ message: 'Internal server error.', error: err });
    }
};

export const getBranchContacts = async (req: Request, res: Response) => {
    try {
        const branchContactRepo = AppDataSource.getRepository(BranchContact);
        const branchContact = await branchContactRepo.find();
        return res.status(200).json(branchContact);
    } catch (err) {
        console.error("Error getting branches:", err);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

export const getBranchContactById = async (req: Request, res: Response) => {
    try {
        const branchContactRepo = AppDataSource.getRepository(BranchContact);
        const branchContactId = req.params.id;
        const branchContact = await branchContactRepo.findOneBy({ id: branchContactId });
        if (!branchContact) {
            return res.status(404).json({ message: "Branch contact not found" });
        }
        return res.status(200).json(branchContact);
    } catch (err) {
        console.error('Error getting branch contact:', err);
        return res.status(500).json({ message: 'Internal server error.', error: err });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const branchContactRepo = AppDataSource.getRepository(BranchContact);
        const branchRepo = AppDataSource.getRepository(Branch);
        const branchContactId = req.params.id;
        const { phone, branchId } = req.body;
        const branchContact = await branchContactRepo.findOneBy({ id: branchContactId });
        if (!branchContact) {
            return res.status(404).json({ message: "Branch contact not found" });
        }
        if (phone) branchContact.phone = phone;
        if (branchId) {
            const branch = await branchRepo.findOneBy({
                id:
                    branchId
            });
            if (!branch) {
                return res.status(404).json({ message: "Branch not found" });
            }
            branchContact.branch = branch;
        }
        await branchContactRepo.save(branchContact);
        return res.status(200).json({
            message: "Branch contact updated successfully",
            branchContact: {
                id: branchContact.id,
                phone: branchContact.phone,
                branchId: branchContact.branch.id
            }
        });
    } catch (err) {
        console.error('Error updating branch contact:', err);
        return res.status(500).json({ message: 'Internal server error.', error: err });
    }
}

export const deleteBranchContact = async (req: Request, res: Response) => {
    try {
        const branchContactRepo = AppDataSource.getRepository(BranchContact);
        const branchContactId = req.params.id;
        const branchContact = await branchContactRepo.findOneBy({ id: branchContactId });
        if (!branchContact) {
            return res.status(404).json({ message: "Branch contact not found" });
        }
        await branchContactRepo.delete(branchContact);
        return res.status(200).json({ message: "Branch contact deleted successfully" });
    } catch (err) {
        console.error('Error deleting branch contact:', err);
        return res.status(500).json({ message: 'Internal server error.', error: err });
    }
}