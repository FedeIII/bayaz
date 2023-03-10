import { MONSTER_DETAILS_LIST } from './monsterDetailsList';
import { MONSTER_IMAGES } from './monsterImages';
import { MONSTERS } from './monsterList';
import { translateMonster } from './monsterTranslations';

export function Monster(monster) {
  return {
    xp: parseInt(monster.xp, 10),
    challenge: getMonsterChallenge(monster),
    translation: translateMonster(monster.name),
  };
}

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

export function getMonsterDetails(monster) {
  if (isString(monster)) {
    monster = getMonster(monster);
  }

  return monster.details;
}

export function getMonsterHitPoints(monster) {
  return getMonsterDetails(monster)['Hit Points'].match(/\((.+)\)/)[1];
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

export function areAllDead(monstersStats) {
  return monstersStats.filter(m => m.hp > 0).length === 0;
}

export function health(monsterStats) {
  if (isDead(monsterStats)) return 'dead';
  if (isBadlyHurt(monsterStats)) return 'badlyHurt';
  if (isHurt(monsterStats)) return 'hurt';
  return 'alive';
}

export function getMonsterImage(monsterName) {
  return MONSTER_IMAGES[monsterName] || null;
}

export function getMonstersFromEnvironment(env) {
  return Object.values(MONSTERS).filter(
    m => m.environment?.[env] === 'yes' && m.page.includes('mm')
  );
}

export function isMonsterSuitable(monster, xpThreshold = 0, partyMaxLevel) {
  return (
    parseInt(monster.xp, 10) <= xpThreshold &&
    parseInt(monster.challenge, 10) <= partyMaxLevel
  );
}

function getMonsterChallenge(monster) {
  if (monster.challenge.includes('/')) {
    const values = monster.challenge.split('/');
    return values[0] / values[1];
  }

  return parseInt(monster.challenge, 10);
}

export function groupByCR(monsterList) {
  return monsterList.reduce((groupedMonsters, monster) => {
    let crIndex = Monster(monster).challenge;
    crIndex = crIndex < 1 ? 0 : crIndex;
    groupedMonsters[crIndex] = groupedMonsters[crIndex] || [];
    groupedMonsters[crIndex].push(monster);
    return groupedMonsters;
  }, []);
}

export function sortByXp(monsterList) {
  return monsterList.sort((mA, mB) => Monster(mB).xp - Monster(mA).xp);
}
