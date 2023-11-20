import { v4 as uuid } from 'uuid';

import { BUILDING_TYPES } from '~/domain/places/building';
import { mongoose } from '~/services/db.server';

const buildingSchema = new mongoose.Schema({
  id: String,
  type: { type: String, enum: BUILDING_TYPES },
  typeTranslation: String,
  subtype: String,
  subtypeTranslation: String,
  variant: String,
  img: String,
  notes: String,
});

const Building =
  mongoose.models.Building || mongoose.model('Building', buildingSchema);

export async function createBuilding(attrs) {
  const newBuilding = await Building.create({
    id: uuid(),
    ...attrs,
  });

  return newBuilding;
}

export async function updateBuilding(id, attrs) {
  const updatedBuilding = await Building.findOneAndUpdate(
    { id },
    { $set: attrs },
    { new: true }
  ).exec();

  return updatedBuilding;
}

export async function getBuildings() {
  const buildings = await Building.find();
  return buildings;
}

export async function getBuilding(id) {
  const building = await Building.findOne({ id }).exec();
  return building;
}

export async function deleteBuilding(id) {
  const { deletedCount } = await Building.deleteOne({ id });
  return deletedCount;
}
