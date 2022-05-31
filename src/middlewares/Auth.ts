import { Response, NextFunction } from 'express';
import { sign, SignOptions, verify } from 'jsonwebtoken';

import UserModel from '../models/User';
import connection from '../models/connection';

import RequestExtended from '../interfaces/RequestExtended';
import Auth from '../interfaces/Auth';
import User from '../interfaces/User';

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

const model = new UserModel(connection);

const Validation = async (req: RequestExtended, res: Response, next: NextFunction):
Promise<Response | void> => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = verify(authorization, SECRET);
    const { data } = token as Auth;
    const foundUser = await model.getById(data?.id);

    if (foundUser) {
      req.user = [{ id: data?.id, username: data?.username }] as User[];
  
      return next();
    }

    return res.status(401).json({ message: 'Invalid token' });
  } catch (e) {
    if ((e as Error).message.includes('jwt')) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return next(e);
  }
};

export default { Authentication, Validation };