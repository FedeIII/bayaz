import { v4 as uuid } from 'uuid';
import { mongoose } from '~/services/db.server';

// Simple schema for quick NPCs
const npcSchema = new mongoose.Schema({
  id: String,
  name: String,
  race: String,
  gender: String,
  looks: [String],
  behavior: {
    mood: String,
    calm: String,
    stress: String
  },
  talent: String,
  faith: {
    description: String,
    deity: String,
    deityName: String
  },
  ideals: String,
  bonds: String,
  flaws: String,
  notes: String
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

export async function updateNpc(id, npcData) {
  const updatedNpc = await Npc.findOneAndUpdate(
    { id },
    { $set: npcData },
    { new: true }
  ).exec();

  return updatedNpc;
}

export async function deleteNpc(id) {
  await Npc.deleteOne({ id });
}
