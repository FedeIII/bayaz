import { getEncounterXp } from '../encounters/encounters';
import { getMonsters } from '../encounters/monsters';

export function getPartyMaxLevel(pcs) {
  return Math.max(...pcs.map(pc => pc.level));
}

export function getActiveSession(party) {
  const { sessions = [] } = party;

  const lastSession = sessions[sessions.length - 1];

  if (!lastSession) return null;
  if (lastSession.finished) return null;
  return lastSession;
}

export function getEncounterXpForSession(session, pcs) {
  return session.monstersKilled.reduce(
    (xp, monsters) => xp + getEncounterXp(monsters, pcs),
    0
  );
}

export function getEventXpForSession(session) {
  return session.eventsCompleted.reduce((xp, event) => xp + event.xp, 0);
}
