import { Response, NextFunction } from 'express';
import RequestExtended from '../interfaces/RequestExtended';

const notExists = (value: number[] | string | number): boolean => (!value);
const isntArray = (value: number[] | string | number): boolean => (typeof value !== 'object');
const emptyArray = (value: number[]): boolean => (value.length <= 0);

const validationOrder = async (req: RequestExtended, res: Response, next: NextFunction) => {
  try {
    const { productsIds } = req.body;

    switch (true) {
      case (notExists(productsIds)): 
        return res.status(400).json({ message: '"productsIds" is required' });
      case (isntArray(productsIds)): 
        return res.status(422).json({ message: '"productsIds" must be an array' });
      case (emptyArray(productsIds)): 
        return res.status(422).json({ message: '"productsIds" must include only numbers' });
      default:
        return next();
    }
  } catch (e) {
    return next(e);
  }
};

export default validationOrder;