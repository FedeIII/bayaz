import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  roles: [String],
  pcs: [String],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function createUser(attrs) {
  const newUser = await User.findOrCreate({
    ...attrs,
  });

  return newUser;
}

export async function findUserOrCreate({ email }) {
  const user = await User.findOneAndUpdate({ email }, {}, { upsert: true });

  return user;
}

export async function updateUser(email, attrs) {
  const user = await User.findOneAndUpdate(
    { email },
    { $set: attrs },
    { new: true }
  ).exec();

  return user;
}

export async function getUsers() {
  const users = await User.find();
  return users;
}

export async function getUser(attrs) {
  const user = await User.findOne(attrs).exec();
  return user;
}
