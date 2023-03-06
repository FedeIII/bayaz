import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const monsterSchema = new mongoose.Schema({
  name: String,
  maxHp: Number,
  hp: Number,
});

const encounterSchema = new mongoose.Schema({
  id: String,
  partyId: String,
  monsters: [monsterSchema],
});

const Encounter =
  mongoose.models.Encounter || mongoose.model('Encounter', encounterSchema);

export async function createEncounter(partyId, monsters) {
  const newEncounter = await Encounter.create({
    id: uuid(),
    partyId,
    monsters,
  });

  return newEncounter;
}

export async function getEncounters(partyId) {
  const encounters = await Encounter.find({ partyId });
  return encounters;
}

export async function getEncounter(id) {
  const encounter = await Encounter.findOne({ id }).exec();
  return encounter;
}
