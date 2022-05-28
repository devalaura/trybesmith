import { Request, Response, NextFunction } from 'express';

const loginValidation = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void> => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: '"username" is required' });
    } if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }
    return next();
  } catch (e) {
    return next(e);
  }
};

export default loginValidation;