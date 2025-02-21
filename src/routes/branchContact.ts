import {  Router } from 'express';
import { create, getBranchContacts, getBranchContactById ,update, deleteBranchContact } from '../controllers/branchContact.controller';

const router = Router();
router.post('/create', create);
router.get('/get', getBranchContacts);
router.get('/get/:id', getBranchContactById);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteBranchContact);

export default router;