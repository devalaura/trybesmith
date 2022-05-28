import { Request, Response, NextFunction } from 'express';

const invalidLevel = (level: number | string | null) => {
  if (!level) return { status: 400, message: '"level" is required' };
  if (typeof level !== 'number') return { status: 422, message: '"level" must be a number' };
  if (level <= 0) {
    return { status: 422, message: '"level" must be greater than or equal to 1' };
  }
};

const invalid = (
  value: string | number, 
  param: string, 
  min: number,
  level: number | string | null,
) => {
  if (!value) return { status: 400, message: `"${param}" is required` };
  if (typeof value !== 'string') return { status: 422, message: `"${param}" must be a string` };
  if (value.length <= min) {
    return { status: 422, message: `"${param}" length must be at least ${min} characters long` };
  } if (param === 'classe') return invalidLevel(level);
};

const userValidation = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void> => {
  try {
    const { username, classe, level, password } = req.body;

    const usernameInvalid = invalid(username, 'username', 3, null);
    const classeOrLevelInvalid = invalid(classe, 'classe', 3, level);
    const passwordInvalid = invalid(password, 'password', 8, null);

    if (usernameInvalid) {
      return res.status(usernameInvalid.status).json({ message: usernameInvalid.message });
    } if (classeOrLevelInvalid) {
      const { status, message } = classeOrLevelInvalid;
      return res.status(status).json({ message });
    } if (passwordInvalid) {
      return res.status(passwordInvalid.status).json({ message: passwordInvalid.message });
    }
    return next();
  } catch (e) {
    return next(e);
  }
};

export default userValidation;