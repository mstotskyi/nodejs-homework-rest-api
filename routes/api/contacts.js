import express from 'express';

import model from '../../model/index.js';
import {
  validationNewContact,
  validationUpdatedContact,
  validationId,
} from './validation';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await model.getList();
  res.status(200).json(contacts);
});

router.get('/:id', validationId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }

  res.status(404).json({ message: 'Not found' });
});

router.post('/', validationNewContact, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  return res.status(201).json(newContact);
});

router.delete('/:id', validationId, async (req, res, next) => {
  const { id } = req.params;
  const removedContact = await model.removeContact(id);
  if (removedContact) {
    return res.status(200).json({ message: 'contact deleted' });
  }
  res.status(404).json({ message: 'Not found' });
});

router.put(
  '/:id',
  validationId,
  validationUpdatedContact,
  async (req, res, next) => {
    const { id } = req.params;
    const updatedContact = await model.updateContact(id, req.body);
    if (updatedContact) {
      return res.status(200).json(updatedContact);
    }
    res.status(404).json({ message: 'Not found' });
  },
);

export default router;
