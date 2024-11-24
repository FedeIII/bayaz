import { v4 as uuid } from 'uuid';
import { mongoose } from '~/services/db.server';

// Simple schema for quick NPCs
const npcSchema = new mongoose.Schema({
  id: String,
  name: String,
  race: String,
  subrace: String,
  gender: String,
  age: Number,
  height: Number,
  weight: Number,
  eyes: String,
  skin: String,
  hair: String,
  deity: String,
  personality: String,
  appearance: String,
  talent: String,
  mannerism: String,
  interaction: String,
  ideal: String,
  bond: String,
  flaw: String,
  occupation: String,
  voice: String,
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
