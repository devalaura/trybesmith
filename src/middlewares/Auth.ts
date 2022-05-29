import { Response, NextFunction } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';

import RequestExtended from '../interfaces/RequestExtended';

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

export default Authentication;