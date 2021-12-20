import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

import contacts from './contacts.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = () => {
  return contacts;
};

const getContactById = async contactId => {
  const contact = contacts.find(contact => contact.id === contactId);
  return contact;
};

const removeContact = async contactId => {
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);

    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    );
    return contacts;
  }
  return null;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    );
    return updatedContact;
  }
  return null;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
