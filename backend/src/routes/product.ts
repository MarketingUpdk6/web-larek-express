import { Router } from 'express';
import productController from '../controllers/product';
import { validateProductId, validateCreateProduct } from '../middlewares/validation';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', validateProductId, productController.getProductById);
router.post('/', validateCreateProduct, productController.createProduct);

export default router;
