import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500
    ? 'Внутренняя ошибка сервера'
    : error.message;

  return res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
