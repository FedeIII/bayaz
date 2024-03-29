import { getEncounterXp } from '../encounters/encounters';

export function getPartyMaxLevel(pcLevels) {
  return Math.max(...pcLevels);
}

export function getActiveSession(party) {
  const { sessions = [] } = party;

  const lastSession = sessions[sessions.length - 1];

  if (!lastSession) return null;
  if (lastSession.finished) return null;
  return lastSession;
}

export function getEncounterXpForSession(session, numberOfPcs) {
  return session.monstersKilled.reduce(
    (xp, monsters) => xp + getEncounterXp(monsters, numberOfPcs),
    0
  );
}

export function getEventXpForSession(session) {
  return session.eventsCompleted.reduce((xp, event) => xp + event.xp, 0);
}

export function getXpForSession(session, numberOfPcs) {
  return getEncounterXpForSession(session, numberOfPcs) + getEventXpForSession(session);
}

export function getXpForSessionPerPc(session, numberOfPcs) {
  return getXpForSession(session, numberOfPcs) / numberOfPcs;
}
