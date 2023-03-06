import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const monsterSchema = new mongoose.Schema({
  id: String,
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
    monsters: monsters.map(m => ({ ...m, id: uuid() })),
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

export async function deleteEncounter(id) {
  const { deletedCount } = await Encounter.deleteOne({ id });
  return deletedCount;
}

export async function damageMonster(encounterId, monsterId, damage) {
  const updatedEncounter = await Encounter.findOneAndUpdate(
    { id: encounterId, 'monsters.id': monsterId },
    { $inc: { 'monsters.$.hp': -damage } },
    { new: true }
  );

  return updatedEncounter;
}
