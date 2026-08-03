import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { IOrder } from '../types/order';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (
  req: Request<{}, {}, IOrder>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      total,
      items,
    } = req.body;

    const products = await Product.find({
      _id: { $in: items },
    });

    if (products.length !== items.length) {
      throw new BadRequestError('Один или несколько товаров не найдены');
    }

    const unavailableProduct = products.find(
      (product) => product.price === null,
    );

    if (unavailableProduct) {
      throw new BadRequestError('Один или несколько товаров недоступны для продажи');
    }

    const calculatedTotal = products.reduce(
      (sum, product) => sum + product.price!,
      0,
    );

    if (calculatedTotal !== total) {
      throw new BadRequestError('Некорректная сумма заказа');
    }

    return res.status(200).json({
      id: randomUUID(),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
