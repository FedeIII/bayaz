import { v4 as uuid } from 'uuid';
import { ITEM_CATEGORY, ITEM_RARITY } from '~/domain/equipment/items';

import { mongoose } from '~/services/db.server';

const itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  consumable: Boolean,
  charges: Number,
  category: {
    type: String,
    enum: ITEM_CATEGORY,
  },
  subtype: String,
  rarity: {
    type: String,
    enum: ITEM_RARITY,
  },
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export async function createItem(attrs) {
  const newItem = await Item.create({
    id: uuid(),
    ...attrs,
  });

  return newItem;
}

export async function updateItem(id, attrs) {
  const updatedItem = await Item.findOneAndUpdate(
    { id },
    { $set: attrs },
    { new: true }
  ).exec();

  return updatedItem;
}

export async function getItems() {
  const places = await Item.find();
  return places;
}

export async function getItem(id) {
  const place = await Item.findOne({ id }).exec();
  return place;
}

export async function deleteItem(id) {
  const { deletedCount } = await Item.deleteOne({ id });
  return deletedCount;
}
