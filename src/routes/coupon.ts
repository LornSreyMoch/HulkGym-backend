import { Router } from 'express';
import { getCoupons, createCoupon, updateCoupon, deleteCoupon } from '../controllers/coupon.controller';

const router = Router();

router.get('/', getCoupons);

router.post('/create', createCoupon);

router.put('/:id', updateCoupon);

router.delete('/:id', deleteCoupon);

export default router;
