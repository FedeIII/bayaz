import { v4 as uuid } from 'uuid';
import { mongoose } from '~/services/db.server';

const locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
});

const regionSchema = new mongoose.Schema({
  id: String,
  type: { type: String, enum: ['dominion', 'subdominion', 'other'] },
  name: String,
  color: String,
  points: [[Number, Number]],
  nameLocation: locationSchema,
});

const Region = mongoose.models.Region || mongoose.model('Region', regionSchema);

export async function createRegion(attrs) {
  const newRegion = await Region.create({
    id: uuid(),
    ...attrs,
    nameLocation: attrs.nameLocation || attrs.points[0],
  });

  return newRegion;
}

export async function updateRegion(id, attrs) {
  const points = attrs.points
    ? Array.from(new Set(attrs.points.map(point => JSON.stringify(point)))).map(
        point => JSON.parse(point)
      )
    : undefined;
  const updatedRegion = await Region.findOneAndUpdate(
    { id },
    { $set: { ...attrs, points } },
    { new: true }
  ).exec();

  return updatedRegion;
}

export async function getRegions() {
  const regions = await Region.find().lean();
  return regions;
}

export async function getRegion(id) {
  const region = await Region.findOne({ id }).lean().exec();
  return region;
}

export async function deleteRegion(id) {
  const { deletedCount } = await Region.deleteOne({ id });
  return deletedCount;
}
