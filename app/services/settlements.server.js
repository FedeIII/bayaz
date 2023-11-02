import { v4 as uuid } from 'uuid';
import {
  COMMERCE,
  GOVERNMENTS,
  GOVERNMENT_SITUATION,
  PLACE_CALAMITY,
  PLACE_CARACTERISTICS,
  PLACE_KNOWN_FOR,
  RACE_RELATIONSHIPS,
} from '~/domain/places/places';

import { mongoose } from '~/services/db.server';

const governmentSchema = new mongoose.Schema({
  type: { type: String, enum: GOVERNMENTS.map(a => a[1]) },
  situation: { type: String, enum: GOVERNMENT_SITUATION.map(a => a[1]) },
});

const religionSchema = new mongoose.Schema({
  temples: [String],
  shrines: [String],
});

const settlementSchema = new mongoose.Schema({
  id: String,
  type: { type: String, enum: ['village', 'town', 'city'] },
  name: String,
  population: Number,
  accommodation: [String],
  government: governmentSchema,
  security: Number,
  securityType: { type: String, enum: ['guards', 'militia'] },
  commerces: [{ type: String, enum: COMMERCE.map(a => a[1]) }],
  religion: religionSchema,
  magicShops: Number,
  raceRelationships: { type: String, enum: RACE_RELATIONSHIPS.map(a => a[1]) },
  placeCharacteristics: { type: String, enum: PLACE_CARACTERISTICS },
  knownFor: { type: String, enum: PLACE_KNOWN_FOR },
  calamity: { type: String, enum: PLACE_CALAMITY.map(a => a[1]) },
});

const Settlement =
  mongoose.models.Settlement || mongoose.model('Settlement', settlementSchema);

export async function createSettlement(attrs) {
  const newSettlement = await Settlement.create({
    id: uuid(),
    type: attrs.type,
    name: attrs.name,
    population: attrs.population,
    accommodation: attrs.accommodation,
    security: attrs.guards || attrs.militia,
    securityType: attrs.guards ? 'guards' : 'militia',
    religion: {
      temples: attrs.temples,
      shrines: attrs.shrines,
    },
  });

  return newSettlement;
}

export async function getSettlements() {
  const settlements = await Settlement.find();
  return settlements;
}

export async function getSettlement(id) {
  const settlement = await Settlement.findOne({ id }).exec();
  return settlement;
}

export async function deleteSettlement(id) {
  const { deletedCount } = await Settlement.deleteOne({ id });
  return deletedCount;
}
