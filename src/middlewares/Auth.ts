import { Request, Response, NextFunction } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';

const SECRET = 'hardcodedpqnaopodeusarvariaveldeambiente';

const jwtConfig: SignOptions = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

export default (async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const token = sign({ data: { email, password } }, SECRET, jwtConfig);
    
    req.headers.authorization = token;

    return next();
  } catch (e) {
    return next(e);
  }
});