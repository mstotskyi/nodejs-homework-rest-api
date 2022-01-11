import Joi from 'Joi';
import { HttpCode, Subscription } from '../../../libs/constants';
import { ValidationMessages } from '../../../libs/messages';

const regCredentialsSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  subscription: Joi.string().valid(
    Subscription.STARTER,
    Subscription.PRO,
    Subscription.BUSINESS,
  ),
  token: Joi.string().token(),
});

const logCredentialsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

const tokenSchema = Joi.object({
  token: Joi.string().token(),
});

const updateSubscriptionSchema = Joi.object({
  id: Joi.string().required(),
  subscription: Joi.string().required(),
});

export const validateRegCredentials = async (req, res, next) => {
  try {
    await regCredentialsSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `Field ${error.message.replace(/"/g, '')}` });
  }
  next();
};

export const validateLogCredentials = async (req, res, next) => {
  try {
    await logCredentialsSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `${ValidationMessages.LOGIN_MSG}` });
  }
  next();
};

export const validateToken = async (req, res, next) => {
  try {
    await tokenSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `${ValidationMessages.TOKEN_MSG}` });
  }
  next();
};

export const validateUpdateSubscription = async (req, res, next) => {
  try {
    await updateSubscriptionSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `${ValidationMessages.SUBSCRIPTION_MSG}` });
  }
  next();
};
