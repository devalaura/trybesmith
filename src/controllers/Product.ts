import { NextFunction, Request, Response } from 'express';

import ProductService from '../services/Product';

export default class ProductController {
  constructor(public service = new ProductService()) {}

  public getAll = async (_req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const result = await this.service.getAll();

      return res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  };
}