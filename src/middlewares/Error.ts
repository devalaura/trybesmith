import { Request, Response, NextFunction } from 'express';

export default ((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = error;

  switch (name) {
    case 'ValidationError':
      return res.status(400).json({ message });
    case 'NotFoundError':
      return res.status(404).json({ message });
    case 'ConflictError':
      return res.status(409).json({ message });
    default:
      console.log({ name: message });
      return res.status(500).json({ message: 'Bad request' });
  }
});