import { Request, Response } from 'express';
import { AppDataSource } from '../config';
import { Coupon } from '../entity/coupon.entity';

const couponRepository = AppDataSource.getRepository(Coupon);

// Get all coupons
export const getCoupons = async (req: Request, res: Response) => {
    try {
        const coupons = await couponRepository.find();
        return res.status(200).json({ message: 'Success', coupons });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
};

// Create a new coupon
export const createCoupon = async (req: Request, res: Response) => {
    const { title, offer, valid_until, terms, status } = req.body;

    try {
        const newCoupon = couponRepository.create({
            title,
            offer,
            valid_until,
            terms,
            status,
        });

        await couponRepository.save(newCoupon);
        return res.status(201).json({ message: 'Coupon created successfully', newCoupon });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
};

// Update a coupon
export const updateCoupon = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, offer, valid_until, terms, status } = req.body;

    try {
        const coupon = await couponRepository.findOne({ where: { id } });

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        coupon.title = title ?? coupon.title;
        coupon.offer = offer ?? coupon.offer;
        coupon.valid_until = valid_until ?? coupon.valid_until;
        coupon.terms = terms ?? coupon.terms;
        coupon.status = status ?? coupon.status;

        await couponRepository.save(coupon);
        return res.status(200).json({ message: 'Coupon updated successfully', coupon });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
};

// Delete a coupon
export const deleteCoupon = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const coupon = await couponRepository.findOne({ where: { id } });

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        await couponRepository.remove(coupon);
        return res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
};
