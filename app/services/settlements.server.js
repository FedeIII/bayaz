import { v4 as uuid } from 'uuid';
import {
  COMMERCE,
  DOMINION_NAMES,
  GOVERNMENTS,
  GOVERNMENT_SITUATION,
  PLACE_CALAMITY,
  PLACE_CHARACTERISTICS,
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

const locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
});

const settlementSchema = new mongoose.Schema({
  id: String,
  type: { type: String, enum: ['village', 'town', 'city'] },
  name: String,
  img: String,
  population: Number,
  accommodation: [String],
  government: governmentSchema,
  security: Number,
  securityType: { type: String, enum: ['guards', 'militia'] },
  commerces: [{ type: String, enum: COMMERCE.map(a => a[1]) }],
  religion: religionSchema,
  magicShops: Number,
  raceRelationships: { type: String, enum: RACE_RELATIONSHIPS.map(a => a[1]) },
  placeCharacteristics: { type: String, enum: PLACE_CHARACTERISTICS },
  knownFor: { type: String, enum: PLACE_KNOWN_FOR },
  calamity: { type: String, enum: PLACE_CALAMITY.map(a => a[1]) },
  dominion: { type: String, enum: DOMINION_NAMES },
  subdominion: String,
  notes: String,
  location: { type: locationSchema, default: null },
});

const Settlement =
  mongoose.models.Settlement || mongoose.model('Settlement', settlementSchema);

function attrToSchema(attrs) {
  const newAttrs = {};
  if (attrs.type) newAttrs.type = attrs.type;
  if (attrs.name) newAttrs.name = attrs.name;
  if (attrs.img) newAttrs.img = attrs.img;
  if (attrs.population) newAttrs.population = attrs.population;
  if (attrs.dominion) newAttrs.dominion = attrs.dominion;
  if (attrs.subdominion) newAttrs.subdominion = attrs.subdominion;
  if (attrs.accommodation) newAttrs.accommodation = attrs.accommodation;
  if (attrs.governmentType)
    newAttrs.government = {
      type: attrs.governmentType,
      situation: attrs.governmentSituation,
    };
  if (attrs.guards || attrs.militia)
    newAttrs.security = attrs.guards || attrs.militia;
  if (attrs.guards) newAttrs.securityType = 'guards';
  if (attrs.militia) newAttrs.securityType = 'militia';
  if (attrs.commerces) newAttrs.commerces = attrs.commerces;
  if (attrs.temples || attrs.shrines)
    newAttrs.religion = {
      temples: attrs.temples,
      shrines: attrs.shrines,
    };
  if (attrs.magicShops) newAttrs.magicShops = attrs.magicShops;
  if (attrs.raceRelationships)
    newAttrs.raceRelationships = attrs.raceRelationships;
  if (attrs.placeCharacteristics)
    newAttrs.placeCharacteristics = attrs.placeCharacteristics;
  if (attrs.knownFor) newAttrs.knownFor = attrs.knownFor;
  if (attrs.calamity) newAttrs.calamity = attrs.calamity;
  if (attrs.notes) newAttrs.notes = attrs.notes;
  if (attrs.location) newAttrs.location = attrs.location;

  return newAttrs;
}

export async function createSettlement(attrs) {
  const newSettlement = await Settlement.create({
    id: uuid(),
    ...attrToSchema(attrs),
  });

  return newSettlement;
}

export async function updateSettlement(id, attrs) {
  const updatedSettlement = await Settlement.findOneAndUpdate(
    { id },
    { $set: attrToSchema(attrs) },
    { new: true }
  ).exec();

  return updatedSettlement;
}

export async function getSettlements() {
  const settlements = await Settlement.find();
  return settlements;
}

export async function getSettlementsByDominionAndName() {
  const settlements = await Settlement.find().exec();
  const dominionMap = {};

  settlements.forEach(settlement => {
    const { dominion, subdominion, name } = settlement;
    if (!dominionMap[dominion]) {
      dominionMap[dominion] = {};
    }
    if (!dominionMap[dominion][subdominion]) {
      dominionMap[dominion][subdominion] = [];
    }
    dominionMap[dominion][subdominion].push(settlement);
  });

  const result = Object.entries(dominionMap).map(
    ([dominionName, subdominions]) => {
      const subdominionEntries = Object.entries(subdominions).map(
        ([subdominionName, settlements]) => {
          settlements.sort((a, b) => a.name.localeCompare(b.name));
          return [subdominionName, settlements];
        }
      );
      return [dominionName, subdominionEntries];
    }
  );

  return result;
}

export async function getSettlement(id) {
  const settlement = await Settlement.findOne({ id }).exec();
  return settlement;
}

export async function deleteSettlement(id) {
  const { deletedCount } = await Settlement.deleteOne({ id });
  return deletedCount;
}

export async function getSettlementMap(ids) {
  const settlements = {};
  const settlementsPromise = ids.map(getSettlement);
  const results = await Promise.all(settlementsPromise);
  results.forEach(settlement => {
    settlements[settlement.id] = settlement;
  });
  return settlements;
}
