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
}