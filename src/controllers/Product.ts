import { NextFunction, Request, Response } from 'express';

import ProductService from '../services/Product';

export default class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public async getAll(_req: Request, res: Response, next: NextFunction): 
  Promise<Response | NextFunction> {
    try {
      const result = await this.service.getAll();

      return res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  }
}