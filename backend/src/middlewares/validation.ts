import { celebrate, Joi, Segments } from 'celebrate';

export const validateProductId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

export const validateCreateProduct = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string()
      .min(2)
      .max(30)
      .required(),

    image: Joi.object({
      fileName: Joi.string()
        .min(1)
        .max(200)
        .required(),

      originalName: Joi.string()
        .min(1)
        .max(200)
        .required(),
    }).required(),

    category: Joi.string()
      .min(2)
      .max(60)
      .required(),

    description: Joi.string()
      .min(2)
      .max(1000)
      .required(),

    price: Joi.number()
      .min(0)
      .allow(null),
  }),
});

export const validateCreateOrder = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string()
      .valid('card', 'online')
      .required(),

    email: Joi.string()
      .email()
      .required(),

    phone: Joi.string()
      .required(),

    address: Joi.string()
      .required(),

    total: Joi.number()
      .min(0)
      .required(),

    items: Joi.array()
      .items(
        Joi.string()
          .hex()
          .length(24)
          .required(),
      )
      .min(1)
      .unique()
      .required(),
  }),
});
