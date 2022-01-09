import repoContacts from '../../repository/contacts';
import { HttpCode } from '../../libs/constants';

import { ContactsMessages } from '../../libs/messages';

export const listContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await repoContacts.listContacts(userId, req.query);
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { ...contacts } });
};

export const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await repoContacts.getContactById(userId, id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } });
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `${ContactsMessages.NOT_FOUND}`,
  });
};

export const addContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await repoContacts.addContact(userId, req.body);
  return res
    .status(HttpCode.OK)
    .json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact: newContact },
    });
};

export const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const removedContact = await repoContacts.removeContact(userId, id);
  if (removedContact) {
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      message: `${ContactsMessages.DELETED}`,
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `${ContactsMessages.NOT_FOUND}`,
  });
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const updatedContact = await repoContacts.updateContact(userId, id, req.body);
  if (updatedContact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { updatedContact } });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `${ContactsMessages.NOT_FOUND}`,
  });
};
