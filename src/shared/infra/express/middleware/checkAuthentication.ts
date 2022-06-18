import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@errors/AppError';

export function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError('Unauthorized request');
  }
  const [, token] = authToken.split(' ');
  const apiKey = 'willSwitchLater';
  try {
    jwt.verify(token, apiKey);
    return next();
  } catch (err) {
    throw new AppError('Invalid token');
  }
}
