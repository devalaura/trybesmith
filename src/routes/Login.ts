import { Router } from 'express';

import auth from '../middlewares/Auth';
import loginValidation from '../middlewares/Login';
import UserController from '../controllers/User';

const controller = new UserController();

const router = Router();

router.post('/', loginValidation, controller.login, auth.Authentication);

export default router;