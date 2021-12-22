import Joi from 'Joi';

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or('name', 'email', 'phone');

const idSchema = Joi.object({
  id: Joi.string().required(),
});

export const validationNewContact = async (req, res, next) => {
  try {
    const value = await createContactSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Field ${error.message.replace(/"/g, '')}` });
  }
  next();
};

export const validationUpdatedContact = async (req, res, next) => {
  try {
    const value = await updateContactSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: 'missing fields' });
  }
  next();
};

export const validationId = async (req, res, next) => {
  try {
    const value = await idSchema.validateAsync(req.params);
  } catch (error) {
    return res.status(400).json({ message: error.message.replace(/"/g, '') });
  }
  next();
};
