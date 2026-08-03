import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/product';

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    unique: true,
    required: [true, 'Поле "title" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
  },
  image: {
    fileName: {
      type: String,
      required: [true, 'Поле "fileName" должно быть заполнено'],
      minlength: [1, 'Минимальная длина поля "fileName" - 1'],
      maxlength: [200, 'Максимальная длина поля "fileName" - 200'],
    },
    originalName: {
      type: String,
      minlength: [1, 'Минимальная длина поля "originalName" - 1'],
      maxlength: [200, 'Максимальная длина поля "originalName" - 200'],
      required: [true, 'Поле "originalName" должно быть заполнено'],
    },
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "category" - 2'],
    maxlength: [60, 'Максимальная длина поля "category" - 60'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "description" - 2'],
    maxlength: [1000, 'Максимальная длина поля "description" - 1000'],
  },
  price: {
    type: Number,
    default: null,
    validate: {
      validator: (value: number | null) => value === null || value >= 0,
      message: 'Поле "price" не может быть отрицательным',
    },
  },
});

export default mongoose.model<IProduct>('Product', productSchema);
