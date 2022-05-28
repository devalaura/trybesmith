import { NextFunction, Request, Response } from 'express';

import OrderService from '../services/Order';

export default class OrderController {
  constructor(public service = new OrderService()) {}

  public getAll = async (_req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const orders = await this.service.getAll();

      return res.status(200).json(orders);
    } catch (e) {
      return next(e);
    }
  };
}