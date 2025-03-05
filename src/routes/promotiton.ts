import { Router } from 'express';
import { getPromotions, createPromotion, updatePromotion, deletePromotion } from '../controllers/promotion.controller';

const router = Router();

router.get('/', getPromotions);

router.post('/create', createPromotion);

router.put('/:id', updatePromotion);

router.delete('/:id', deletePromotion);

export default router;
