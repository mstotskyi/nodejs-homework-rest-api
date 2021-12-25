import Joi from 'Joi';
import { HttpCode } from '../../../libs/constants';

import mongoose from 'mongoose';
const { Types } = mongoose;

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone');

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

export const validationNewContact = async (req, res, next) => {
  try {
    await createContactSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `Field ${error.message.replace(/"/g, '')}` });
  }
  next();
};

export const validationUpdatedContact = async (req, res, next) => {
  try {
    await updateContactSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({ message: 'missing fields' });
  }
  next();
};

export const validationId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: 'Invalid ObjectId' });
  }
  next();
};

export const validationUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: 'missing field favorite' });
  }
  next();
};
