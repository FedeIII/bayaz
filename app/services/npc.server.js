import { v4 as uuid } from 'uuid';
import { mongoose } from '~/services/db.server';
import { getSettlements } from './settlements.server';

// Simple schema for quick NPCs
const npcSchema = new mongoose.Schema({
  id: String,
  name: String,
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

export async function getNpc(id) {
  const npc = await Npc.findOne({ id }).exec();
  return npc;
}

export async function updateNpc(npcData) {
  console.log('updateNpc', npcData);
  const updatedNpc = await Npc.findOneAndUpdate(
    { id: npcData.id },
    { $set: npcData },
    { new: true }
  ).exec();

  console.log('updatedNpc', updatedNpc);
  return updatedNpc;
}

export async function deleteNpc(id) {
  await Npc.deleteOne({ id });
}

export async function getNpcWithSettlements(id) {
  const [npc, settlements] = await Promise.all([
    Npc.findOne({ id }).exec(),
    getSettlements(),
  ]);
  return { npc, settlements };
}
