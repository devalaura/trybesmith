import { Router } from 'express';

import UserController from '../controllers/User';
import userValidation from '../middlewares/User';
import Authentication from '../middlewares/Auth';
import Error from '../middlewares/Error';

const router = Router();

const controller = new UserController();

router.post('/', userValidation, Authentication, controller.create);
router.use(Error);

export default router;