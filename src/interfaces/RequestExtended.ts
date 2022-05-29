import { Request } from 'express';

import User from './User';

export default interface RequestExtended extends Request {
  user?: User[] | void;
}