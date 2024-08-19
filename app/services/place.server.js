import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const placeSchema = new mongoose.Schema({
  id: String,
  group: String,
  name: String,
  img: String,
  description: String,
  notes: String,
  belongsTo: String,
  isRegion: Boolean,
  isDominion: Boolean,
  region: String,
});

const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);

export async function createPlace(attrs) {
  const newPlace = await Place.create({
    id: uuid(),
    ...attrs,
  });

  return newPlace;
}

export async function updatePlace(id, attrs) {
  const updatedPlace = await Place.findOneAndUpdate(
    { id },
    { $set: attrs },
    { new: true }
  ).exec();

  return updatedPlace;
}

export async function getPlaces() {
  const places = await Place.find();
  return places;
}

export async function getPlace(id) {
  const place = await Place.findOne({ id }).exec();
  return place;
}

export async function getPlaceByName(name) {
  const region = await Place.findOne({ name }).exec();
  return region;
}

export async function deletePlace(id) {
  const { deletedCount } = await Place.deleteOne({ id });
  return deletedCount;
}

export async function getPlacesByGroup() {
  const places = await getPlaces();

  if (!places) return null;

  return places.reduce(
    (placesByGroup, place) => ({
      ...placesByGroup,
      [place.group]: [...(placesByGroup[place.group] || []), place],
    }),
    {}
  );
}
