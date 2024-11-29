import { v4 as uuid } from 'uuid';

import { mongoose } from '~/services/db.server';

const eventSchema = new mongoose.Schema({
  text: String,
  xp: Number,
});

const sessionSchema = new mongoose.Schema(
  {
    id: String,
    finished: Boolean,
    monstersKilled: [[String]],
    eventsCompleted: [eventSchema],
    notes: String,
  },
  { timestamps: true }
);

const partySchema = new mongoose.Schema({
  id: String,
  name: String,
  players: [String],
  sessions: [sessionSchema],
  npcs: Boolean,
});

const Party = mongoose.models.Party || mongoose.model('Party', partySchema);

export async function createParty(players, npcs = false) {
  const newParty = await Party.create({
    id: uuid(),
    players,
    npcs,
  });

  return newParty;
}

export async function getParties() {
  const parties = await Party.find();
  return parties;
}

export async function getPcParties() {
  const parties = await Party.find({ npcs: false });
  return parties;
}

export async function getNpcParties() {
  const parties = await Party.find({ npcs: true });
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

export async function addEventCompleted(
  partyId,
  sessionId,
  eventText,
  eventXp
) {
  const updatedParty = await Party.findOneAndUpdate(
    { id: partyId, 'sessions.id': sessionId },
    {
      $push: {
        'sessions.$.eventsCompleted': { text: eventText, xp: eventXp || 0 },
      },
    }
  );

  return updatedParty;
}

export async function setPartyName(id, name) {
  const updatedParty = await Party.findOneAndUpdate({ id }, { name });

  return updatedParty;
}

export async function setNotesToSession(partyId, sessionId, notes) {
  const updatedParty = await Party.findOneAndUpdate(
    { id: partyId, 'sessions.id': sessionId },
    { 'sessions.$.notes': notes }
  );

  return updatedParty;
}
