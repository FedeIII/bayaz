import { v4 as uuid } from 'uuid';
import { mongoose } from '~/services/db.server';
import { getSettlementMap } from './settlements.server';

// Simple schema for quick NPCs
const npcSchema = new mongoose.Schema({
  id: String,
  name: String,
  img: String,
  doc: String,
  race: String,
  gender: String,
  settlementId: { type: String, required: false },
  looks: [String],
  behavior: {
    mood: String,
    calm: String,
    stress: String,
  },
  talent: String,
  faith: {
    description: String,
    deity: String,
    deityName: String,
  },
  ideals: String,
  bonds: String,
  flaws: String,
  notes: String,
});

const Npc = mongoose.models.Npc || mongoose.model('Npc', npcSchema);

export async function createNpc(npcData) {
  const npc = await Npc.create({
    ...npcData,
    id: uuid(),
  });

  return npc;
}

export async function getNpcs() {
  const npcs = await Npc.find();
  return npcs;
}

export async function getNpcsBySubdominions() {
  const npcs = await getNpcs();
  const settlements = await getSettlementMap(
    Array.from(new Set(npcs.map(npc => npc.settlementId)))
  );

  const npcsBySubdominions = Object.values(settlements).reduce(
    (acc, settlement) => {
      const subdominionName = settlement.subdominion;
      if (!acc[subdominionName]) {
        acc[subdominionName] = [];
      }
      const npcsInSettlement = npcs.filter(
        npc => npc.settlementId === settlement.id
      );
      acc[subdominionName].push(...npcsInSettlement);
      return acc;
    },
    {}
  );

  const result = Object.entries(npcsBySubdominions).map(
    ([subdominionName, npcs]) => [
      subdominionName,
      npcs.sort((a, b) => a.name.localeCompare(b.name)),
    ]
  );

  return result;
}

export async function getNpc(id) {
  const npc = await Npc.findOne({ id }).exec();
  return npc;
}

export async function updateNpc(npcData) {
  const updatedNpc = await Npc.findOneAndUpdate(
    { id: npcData.id },
    { $set: npcData },
    { new: true }
  ).exec();

  return updatedNpc;
}

export async function deleteNpc(id) {
  await Npc.deleteOne({ id });
}
