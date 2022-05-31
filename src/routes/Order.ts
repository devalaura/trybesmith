import { Router } from 'express';

import validationOrder from '../middlewares/Order';
import auth from '../middlewares/Auth';
import OrderController from '../controllers/Order';

const router = Router();

const controller = new OrderController();

router.post('/', auth.Validation, validationOrder, controller.create);
router.get('/', controller.getAll);

export default router;