import { v4 as uuid } from 'uuid';
import { ITEM_CATEGORY, ITEM_RARITY } from '~/domain/equipment/items';

import { mongoose } from '~/services/db.server';

const bonusSchema = new mongoose.Schema({
  hit: Number,
});

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
  subcategory: String,
  rarity: {
    type: String,
    enum: ITEM_RARITY,
  },
  bonus: bonusSchema,
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export async function createItem(attrs) {
  let nonMagicItem = {};
  if (attrs.category === 'armor') nonMagicItem = getItem(attrs.subcategory);
  if (attrs.category === 'weapon') nonMagicItem = getItem(attrs.subcategory);
  if (attrs.category === 'staff') nonMagicItem = getItem('quarterstaff');

  const newItem = await Item.create({
    id: uuid(),
    ...nonMagicItem,
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

export async function getItemByName(itemName) {
  const place = await Item.findOne({ name: itemName }).exec();
  return place;
}

export async function deleteItem(id) {
  const { deletedCount } = await Item.deleteOne({ id });
  return deletedCount;
}
