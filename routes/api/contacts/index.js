import express from 'express';

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from '../../../controllers/index.js';

import {
  validationNewContact,
  validationUpdateContact,
  validationId,
  validationUpdateFavorite,
} from './validation';

const router = express.Router();

router.get('/', listContacts);

router.get('/:id', validationId, getContactById);

router.post('/', validationNewContact, addContact);

router.delete('/:id', validationId, removeContact);

router.put('/:id', validationId, validationUpdateContact, updateContact);

router.patch('/:id/favorite', validationUpdateFavorite, updateContact);

export default router;