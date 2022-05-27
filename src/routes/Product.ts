import { Router } from 'express';

import ProductController from '../controllers/Product';
import productValidation from '../middlewares/Product';

const router = Router();

const controller = new ProductController();

router.post('/', productValidation, controller.create);
router.get('/', controller.getAll);

export default router;