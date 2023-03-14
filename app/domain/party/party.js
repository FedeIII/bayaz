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

export function getAllMonstersKilled(session) {
  return session.monstersKilled.reduce(
    (allMonsters, monsters) => [...allMonsters, ...getMonsters(monsters)],
    []
  );
}

export function getEncounterXpForSession(session, pcs) {
  return session.monstersKilled.reduce(
    (xp, monsters) => xp + getEncounterXp(monsters, pcs),
    0
  );
}
