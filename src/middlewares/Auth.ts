import { Response, NextFunction } from 'express';
import { sign, SignOptions, verify } from 'jsonwebtoken';

import RequestExtended from '../interfaces/RequestExtended';
import Authorization from '../interfaces/Auth';

const SECRET = 'hardcodedpqnaopodeusarvariaveldeambiente';

const jwtConfig: SignOptions = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const Authentication = async (req: RequestExtended, res: Response, next: NextFunction):
Promise<Response | void> => {
  try {
    const { user } = req;

    if (user) {
      const { id, username, route } = user[0];
      const token = sign({ data: { id, username } }, SECRET, jwtConfig);

      if (route) return res.status(route).json({ token });

      return res.status(200).json({ token });
    }
  } catch (e) {
    return next(e);
  }
};

const Validation = async (req: RequestExtended, res: Response, next: NextFunction):
Promise<Response | void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = verify(authorization, SECRET);

  const { id, username } = token as Authorization;

  req.user = [{ id, username }];
  
  return next();
};

export default { Authentication, Validation };