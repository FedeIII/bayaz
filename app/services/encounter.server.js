import { v4 as uuid } from 'uuid';
import { createMonsterForEncounter } from '~/domain/encounters/monsters';

import { mongoose } from '~/services/db.server';

const monsterSchema = new mongoose.Schema({
  id: String,
  name: String,
  nick: String,
  maxHp: Number,
  hp: Number,
});

const encounterSchema = new mongoose.Schema({
  id: String,
  group: String,
  name: String,
  monsters: [monsterSchema],
  npcs: [String],
  notes: {
    type: Map,
    of: String,
  },
});

const Encounter =
  mongoose.models.Encounter || mongoose.model('Encounter', encounterSchema);

encounterSchema.index({ id: 1 });

const ensureIndexes = async () => {
  try {
    await Encounter.createIndexes();
    console.log('Indexes created');
  } catch (err) {
    console.error('Error creating indexes:', err);
  }
};
ensureIndexes();

export async function createEncounter({
  id: existingId,
  group,
  name,
  monsters = [],
  npcs = [],
}) {
  const id = existingId || uuid();

  const newEncounter = await Encounter.create({
    id,
    group,
    name,
    monsters: monsters.map(m => ({ ...m, id: uuid() })),
    npcs,
  });

  return newEncounter;
}

export async function getEncounters() {
  const encounters = await Encounter.find();
  return encounters;
}

export async function getEncounterModel(id) {
  const encounter = await Encounter.findOne({ id });
  return encounter;
}

export async function getEncounter(id) {
  const encounterModel = await getEncounterModel(id);
  return encounterModel.toJSON();
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

export async function healMonster(encounterId, monsterId, healing) {
  const encounter = await getEncounterModel(encounterId);

  const monster = encounter.monsters.find(m => m.id === monsterId);

  let updatedEncounter = encounter;
  if (monster.hp + healing > monster.maxHp) {
    updatedEncounter = await Encounter.findOneAndUpdate(
      { id: encounterId, 'monsters.id': monsterId },
      { $set: { 'monsters.$.hp': monster.maxHp } },
      { new: true }
    );
  } else {
    updatedEncounter = await Encounter.findOneAndUpdate(
      { id: encounterId, 'monsters.id': monsterId },
      { $inc: { 'monsters.$.hp': healing } },
      { new: true }
    );
  }

  return updatedEncounter;
}

export async function addMonsterToEncounter(encounterId, monsterName) {
  const encounter = await getEncounterModel(encounterId);
  const monster = createMonsterForEncounter(
    monsterName,
    null,
    encounter.monsters
  );
  encounter.monsters.push(monster);
  return await encounter.save();
}

export async function updateEncounterNotes(encounterId, notes) {
  const encounter = await getEncounterModel(encounterId);
  if (!encounter.notes) {
    encounter.notes = {};
    await encounter.save();
  }
  Object.entries(notes).forEach(([key, value]) =>
    encounter.notes.set(key, value)
  );
  return await encounter.save();
}

export async function getEncountersByGroup() {
  const encounters = await getEncounters();

  return encounters.reduce(
    (encountersByGroup, encounter) => ({
      ...encountersByGroup,
      [encounter.group]: [
        ...(encountersByGroup[encounter.group] || []),
        encounter,
      ],
    }),
    {}
  );
}
