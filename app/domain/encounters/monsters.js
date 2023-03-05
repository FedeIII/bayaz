import { MONSTERS } from './monsterList';

export function getMonsters(monsterNames) {
  if (Array.isArray(monsterNames)) {
    return monsterNames.map(monsterName => MONSTERS[monsterName]);
  }

  if (typeof monsterNames === 'string' || monsterNames instanceof String) {
    return monsterNames.split('|').map(monsterName => MONSTERS[monsterName]);
  }
}

export function getMonstersFromStore() {
  const store = typeof window !== 'undefined' ? window.localStorage : null;

  return getMonsters(store?.getItem('monsters'));
}
