import { NextFunction, Request, Response } from 'express';

import UserService from '../services/User';

export default class UserController {
  constructor(public service = new UserService()) {}

  public create = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const { username, level, classe, password } = req.body;

      const result = await this.service.create(username, level, classe, password);

      return res.status(201).json(result);
    } catch (e) {
      return next(e);
    }
  };
}