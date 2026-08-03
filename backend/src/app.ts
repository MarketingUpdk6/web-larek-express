import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import productRouter from './routes/product';
import errorHandler from './middlewares/error';
import orderRouter from './routes/order';
import NotFoundError from './errors/not-found-error';
import { requestLogger, errorLogger, logger } from './middlewares/logger';

const app = express();
const { PORT, DB_ADDRESS, ORIGIN_ALLOW } = process.env;

if (!PORT || !DB_ADDRESS || !ORIGIN_ALLOW) {
  throw new Error('Не заданы переменные окружения PORT, DB_ADDRESS или ORIGIN_ALLOW');
}

app.use(cors({
  origin: process.env.ORIGIN_ALLOW,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use((_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errorHandler);

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    app.listen(Number(PORT), () => {
      logger.info(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`Ошибка подключения к MongoDB: ${err}`);
  });
