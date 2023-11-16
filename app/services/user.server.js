import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  roles: [String],
  pcs: [String],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function findUserOrCreate({ email }) {
  let user = await User.findOne({ email }).exec();

  if (user) return user;

  user = await User.create({
    id: uuid(),
    roles: ['player'],
    email,
  });

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
