import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

import contacts from './contacts.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  return contacts;
};

const getContactById = async contactId => {
  const contact = contacts.find(contact => contact.id === contactId);
  return contact;
};

const removeContact = async contactId => {
  console.log(contacts);
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

  /// НЕ РОЗУМІЮ ЧОМУ НАВЕДЕНИЙ НИЖЧЕ ВАРІАНТ НЕ ПРАЦЮЄ, ЗАМІНЮЄ КОНТАКТ ПОПЕРЕДНЬО ВИДАЛЕНИМ...В ПЕРШІЙ ДЗ ВСЕ ПРАЦЮВАЛО ОК...

  // const contact = contacts.find(contact => contact.id === contactId);
  // console.log(contact);
  // if (!contact) {
  //   return null;
  // }
  // const updContacts = contacts.filter(contact => contact.id !== contactId);
  // console.log(updContacts);
  // await fs.writeFile(
  //   path.join(__dirname, 'contacts.json'),
  //   JSON.stringify(updContacts, null, 2),
  // );
};

const addContact = async ({ name, email, phone }) => {
  if (name === undefined || email === undefined || phone === undefined) {
    return null;
  }
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  if (!body) {
  }
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body };
    console.log(updatedContact);
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
