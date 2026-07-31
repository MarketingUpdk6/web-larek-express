import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

const getProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      items: products,
      total: products.length,
    });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw new NotFoundError('Товар не найден');
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json(product);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(
        new BadRequestError(
          'Ошибка валидации данных при создании товара',
        ),
      );
    }

    if (error instanceof Error && error.message.includes('E11000')) {
      return next(
        new ConflictError(
          'Товар с таким названием уже существует',
        ),
      );
    }

    return next(error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
};
