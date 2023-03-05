import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const partySchema = new mongoose.Schema({
  id: String,
  players: [String],
});

const Party = mongoose.models.Party || mongoose.model('Party', partySchema);

export async function createParty(players) {
  const newParty = await Party.create({
    id: uuid(),
    players,
  });

  return newParty;
}

export async function getParties() {
  const parties = await Party.find();
  return parties;
}

export async function getParty(id) {
  const party = await Party.findOne({ id }).exec();
  return party;
}
