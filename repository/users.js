import User from '../model/user';

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async body => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar, cloudAvatarId = null) => {
  return await User.updateOne({ _id: id }, { avatar, cloudAvatarId });
};

const updateUserSubscription = async (id, subscription) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    { new: true },
  );
};

export default {
  findById,
  findByEmail,
  create,
  updateToken,
  updateUserSubscription,
  updateAvatar,
};
