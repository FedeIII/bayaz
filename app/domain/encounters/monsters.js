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

export function hurtHP(monsterStats) {
  return monsterStats.maxHp / 2;
}

export function isHurt(monsterStats) {
  return monsterStats.hp < hurtHP(monsterStats);
}

export function badlyHurtHP(monsterStats) {
  return monsterStats.maxHp / 5;
}

export function isBadlyHurt(monsterStats) {
  return monsterStats.hp < badlyHurtHP(monsterStats);
}

export function isDead(monsterStats) {
  return monsterStats.hp <= 0;
}

export function health(monsterStats) {
  if (isDead(monsterStats)) return 'dead';
  if (isBadlyHurt(monsterStats)) return 'badlyHurt';
  if (isHurt(monsterStats)) return 'hurt';
  return 'alive';
}
