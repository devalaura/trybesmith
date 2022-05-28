import { Request, Response, NextFunction } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';

const SECRET = 'hardcodedpqnaopodeusarvariaveldeambiente';

const jwtConfig: SignOptions = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const createJWT = async (req: Request, _res: Response, next: NextFunction):
Promise<Response | void> => {
  try {
    const { id, username } = req.body;
    
    const token = sign({ data: { id, username } }, SECRET, jwtConfig);
    
    req.headers.authorization = token;

    return next();
  } catch (e) {
    return next(e);
  }
};

export default { createJWT };