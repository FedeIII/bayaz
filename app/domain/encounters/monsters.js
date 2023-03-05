import { MONSTER_DETAILS_LIST } from './monsterDetailsList';
import { MONSTERS } from './monsterList';

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

export function getMonster(monsterName) {
  return {
    ...MONSTERS[monsterName],
    details: {
      ...MONSTER_DETAILS_LIST[monsterName],
    },
  };
}

export function getMonsters(monsterNames) {
  if (Array.isArray(monsterNames)) {
    return monsterNames.map(monsterName => MONSTERS[monsterName]);
  }

  if (isString(monsterNames)) {
    return monsterNames.split('|').map(getMonster);
  }
}

export function getMonsterHitPoints(monster) {
  if (isString(monster)) {
    monster = getMonster(monster);
  }

  return monster.details['Hit Points'].match(/\((.+)\)/)[1];
}
