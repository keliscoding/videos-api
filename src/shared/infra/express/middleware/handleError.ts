import { Response, Request, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';

export default function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ error: 'Internal Server Error. Error:' + err.message });
}
