import express from 'express';

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} from '../../../controllers/index.js';

import {
  validationNewContact,
  validationUpdatedContact,
  validationId,
  validationUpdateFavorite,
} from './validation';

const router = express.Router();

router.get('/', listContacts);

router.get('/:id', validationId, getContactById);

router.post('/', validationNewContact, addContact);

router.delete('/:id', validationId, removeContact);

router.put('/:id', validationId, validationUpdatedContact, updateContact);

router.patch('/:id/favorite', validationUpdateFavorite, updateStatusContact);

export default router;
