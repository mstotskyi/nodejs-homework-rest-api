import Contact from '../model/contact';

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = 20, skip = 0 },
) => {
  let sortingCondition = null;
  const total = await Contact.find({ owner: userId }).countDocuments();
  let result = Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email subscription',
  });
  if (sortBy) {
    sortingCondition = { [`${sortBy}`]: 1 };
  }
  if (sortByDesc) {
    sortingCondition = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    result = result.select(filter.split('|').join(' '));
  }
  result = await result
    .skip(Number(skip))
    .limit(Number(limit))
    .sort(sortingCondition);
  return { total, contacts: result };
};

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email subscription',
  });
  return result;
};

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  );
  return result;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
