import Joi from 'Joi';
import { HttpCode } from '../../../libs/constants';
import { ValidationMessages } from '../../../libs/messages';

const resendCredentialsSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const validateResendCredentials = async (req, res, next) => {
  try {
    await resendCredentialsSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: `${ValidationMessages.LOGIN_MSG}` });
  }
  next();
};
