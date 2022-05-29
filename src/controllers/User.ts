import { NextFunction, Response } from 'express';

import UserService from '../services/User';
import RequestExtended from '../interfaces/RequestExtended';

export default class UserController {
  constructor(public service = new UserService()) {}

  public create = async (req: RequestExtended, _res: Response, next: NextFunction):
  Promise<void> => {
    try {
      const { username, classe, level, password } = req.body;

      const user = await this.service.create(username, classe, level, password);

      req.user = user;

      return next();
    } catch (e) {
      return next(e);
    }
  };

  public login = async (req: RequestExtended, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const { username, password } = req.body;

      const user = await this.service.login(username, password);
      
      if (!user) {
        return res.status(401).json({ message: 'Username or password invalid' });
      }

      req.user = user;

      return next();
    } catch (e) {
      return next(e);
    }
  };
}