import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const sessionSchema = new mongoose.Schema(
  {
    id: String,
    finished: Boolean,
    monstersKilled: [[String]],
    eventsCompleted: [String],
  },
  { timestamps: true }
);

const partySchema = new mongoose.Schema({
  id: String,
  players: [String],
  sessions: [sessionSchema],
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

export async function startSession(partyId) {
  const updatedParty = await Party.findOneAndUpdate(
    { id: partyId },
    {
      $push: {
        sessions: { id: uuid() },
      },
    }
  );

  return updatedParty;
}

export async function endSession(partyId, sessionId) {
  const updatedParty = await Party.findOneAndUpdate(
    { id: partyId, 'sessions.id': sessionId },
    {
      'sessions.$.finished': true,
    }
  );

  return updatedParty;
}

export async function addMonstersKilled(partyId, sessionId, monsterNames) {
  const updatedParty = await Party.findOneAndUpdate(
    { id: partyId, 'sessions.id': sessionId },
    {
      $push: { 'sessions.$.monstersKilled': monsterNames },
    },
    { new: true }
  );

  return updatedParty;
}

export async function addEventCompleted(partyId, sessionId, event) {
  const updatedParty = await Party.findOneAndUpdate(
    { id: partyId, 'sessions.id': sessionId },
    {
      $push: {
        eventsCompleted: event,
      },
    }
  );

  return updatedParty;
}
