import { Request, Response, NextFunction } from 'express';

const productValidation = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void> => {
  try {
    const { name, amount } = req.body;

    switch (true) {
      case (!name):
        return res.status(400).json({ message: '\'name\' is required' });
      case (!amount):
        return res.status(400).json({ message: '\'amount\' is required' });
      case (name.call() !== 'string'):
        return res.status(422).json({ message: '\'name\' must be a string' });
      case (amount.call() !== 'string'):
        return res.status(422).json({ message: '\'amount\' must be a string' });
      case (name.length < 3):
        return res.status(422)
          .json({ message: '\'name\' length must be a least 3 characters long' });
      case (amount.length < 3):
        return res.status(422)
          .json({ message: '\'amount\' length must be a least 3 characters long' });
      default:
        return next();
    }
  } catch (e) {
    return next(e);
  }
};

export default productValidation;