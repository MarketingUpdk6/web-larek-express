import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (isCelebrateError(error)) {
    const validationError = Array.from(error.details.values())[0];

    return res.status(400).json({
      message: validationError?.message || 'Ошибка валидации данных',
    });
  }

  const statusCode = error.statusCode || 500;

  const message = statusCode === 500
    ? 'Внутренняя ошибка сервера'
    : error.message;

  return res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
