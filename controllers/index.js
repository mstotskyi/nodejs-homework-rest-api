import repoContacts from '../repository/contacts';
import { HttpCode } from '../libs/constants';

import { ContactsMessages } from '../libs/messages';

export const listContacts = async (req, res, next) => {
  const contacts = await repoContacts.listContacts();
  res.status(HttpCode.OK).json(contacts);
};

export const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repoContacts.getContactById(id);
  if (contact) {
    return res.status(HttpCode.OK).json(contact);
  }

  res
    .status(HttpCode.NOT_FOUND)
    .json({ message: `${ContactsMessages.NOT_FOUND}` });
};

export const addContact = async (req, res, next) => {
  const newContact = await repoContacts.addContact(req.body);
  return res.status(HttpCode.OK).json(newContact);
};

export const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const removedContact = await repoContacts.removeContact(id);
  if (removedContact) {
    return res
      .status(HttpCode.OK)
      .json({ message: `${ContactsMessages.DELETED}` });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ message: `${ContactsMessages.NOT_FOUND}` });
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await repoContacts.updateContact(id, req.body);
  if (updatedContact) {
    return res.status(HttpCode.OK).json(updatedContact);
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ message: `${ContactsMessages.NOT_FOUND}` });
};

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await repoContacts.updateStatusContact(id, req.body);
  if (updatedContact) {
    return res.status(HttpCode.OK).json(updatedContact);
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ message: `${ContactsMessages.NOT_FOUND}` });
};
