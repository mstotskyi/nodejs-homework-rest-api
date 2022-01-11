import express from 'express';

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from '../../../controllers/contacts/index.js';

import {
  validationNewContact,
  validationUpdateContact,
  validationId,
  validationUpdateFavorite,
} from './validation';

import guard from '../../../middlewares/guard.js';

const router = express.Router();

router.get('/', guard, listContacts);

router.get('/:id', guard, validationId, getContactById);

router.post('/', guard, validationNewContact, addContact);

router.delete('/:id', guard, validationId, removeContact);

router.put('/:id', guard, validationId, validationUpdateContact, updateContact);

router.patch('/:id/favorite', guard, validationUpdateFavorite, updateContact);

export default router;
