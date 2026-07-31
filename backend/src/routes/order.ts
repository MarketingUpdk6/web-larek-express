import { Router } from 'express';
import createOrder from '../controllers/orderController';
import { validateCreateOrder } from '../middlewares/validation';

const router = Router();

router.post('/', validateCreateOrder, createOrder);

export default router;
