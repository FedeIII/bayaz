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
  vertices: [locationSchema],
  nameLocation: locationSchema,
});

const Region = mongoose.models.Region || mongoose.model('Region', regionSchema);

export async function createRegion(attrs) {
  const newRegion = await Region.create({
    id: uuid(),
    ...attrs,
    nameLocation: attrs.vertices[0],
  });

  return newRegion;
}

export async function updateRegion(id, attrs) {
  const updatedRegion = await Region.findOneAndUpdate(
    { id },
    { $set: attrs },
    { new: true }
  ).exec();

  return updatedRegion;
}

export async function getRegions() {
  const regions = await Region.find();
  return regions;
}

export async function getRegion(id) {
  const region = await Region.findOne({ id }).exec();
  return region;
}

export async function deleteRegion(id) {
  const { deletedCount } = await Region.deleteOne({ id });
  return deletedCount;
}

export async function deleteVertex(id, vertexId) {
  const region = await getRegion(id);
  region.vertices.pull(vertexId);
  return await region.save();
}

async function moveSingleVertex(id, vertexId, location, isMovingRegion) {
  const region = await getRegion(id);
  const vertex = region.vertices.find(v => v._id.toString() === vertexId);
  vertex.lat = location.lat;
  vertex.lng = location.lng;
  return await region.save();
}

async function moveRegion(id, vertexId, location) {
  const region = await getRegion(id);
  const vertex = region.vertices.find(v => v._id.toString() === vertexId);
  const oldLocation = { lat: vertex.lat, lng: vertex.lng };
  const distance = [
    location.lat - oldLocation.lat,
    location.lng - oldLocation.lng,
  ];

  region.vertices.forEach(vertex => {
    vertex.lat += distance[0];
    vertex.lng += distance[1];
  });

  return await region.save();
}

export async function editVertex(id, vertexId, location, isMovingRegion) {
  if (isMovingRegion) {
    return await moveRegion(id, vertexId, location);
  } else {
    return await moveSingleVertex(id, vertexId, location);
  }
}

export async function editNameLocation(id, location) {
  return await Region.findOneAndUpdate(
    { id },
    { $set: { nameLocation: location } },
    { new: true }
  ).exec();
}
