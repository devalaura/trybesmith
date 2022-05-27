import { Request, Response, NextFunction } from 'express';

const invalid = (value: string | number, param: string) => {
  if (!value) return { status: 400, message: `'${param}' is required` };
  if (typeof value !== 'string') return { status: 422, message: `'${param}' must be a string` };
  if (value.length < 2) {
    return { status: 422, message: `'${param}' must be a least 3 characters long` };
  }
};

const productValidation = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void> => {
  try {
    const { name, amount } = req.body;

    const nameInvalid = invalid(name, 'name');
    const amountInvalid = invalid(amount, 'amount');

    if (nameInvalid) {
      return res.status(nameInvalid.status).json(nameInvalid.message);
    } if (amountInvalid) {
      return res.status(amountInvalid.status).json(amountInvalid.message);
    }
    return next();
  } catch (e) {
    return next(e);
  }
};

export default productValidation;