import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const monsterSchema = new mongoose.Schema({
  id: String,
  name: String,
  nick: String,
  maxHp: Number,
  hp: Number,
  notes: String,
});

const encounterSchema = new mongoose.Schema({
  id: String,
  group: String,
  name: String,
  monsters: [monsterSchema],
  npcs: [String],
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

export async function healMonster(encounterId, monsterId, healing) {
  const encounter = await getEncounter(encounterId);

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

export async function updateMonsterNotes(encounterId, monsterIndex, notes) {
  return await Encounter.updateOne(
    { _id: encounterId },
    {
      $set: {
        [`monsters.${monsterIndex}.notes`]: notes,
      },
    }
  );
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
