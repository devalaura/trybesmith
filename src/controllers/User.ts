import { NextFunction, Request, Response } from 'express';

import UserService from '../services/User';

export default class UserController {
  constructor(public service = new UserService()) {}

  public create = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const { username, classe, level, password } = req.body;

      await this.service.create(username, classe, level, password);

      const { authorization } = req.headers;

      return res.status(201).json({ token: authorization });
    } catch (e) {
      return next(e);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const { username, password } = req.body;
      const { authorization } = req.headers;

      const findUser = await this.service.login(username, password);

      if (!findUser) {
        return res.status(400).json({ message: 'Username or password invalid' });
      }

      return res.status(204).json({ message: authorization });
    } catch (e) {
      return next(e);
    }
  };
}