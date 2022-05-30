import { NextFunction, Request, Response } from 'express';

import OrderService from '../services/Order';
import RequestExtended from '../interfaces/RequestExtended';

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

  public create = async (req: RequestExtended, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const { productsIds } = req.body;
      const { user } = req;

      const order = await this.service.create(productsIds, user);

      if (order.status) {
        return res.status(order.status).json({ message: order.message });
      }

      return res.status(204).json(order);
    } catch (e) {
      return next(e);
    }
  };
}