import { getXpMultiplierForMonsters } from './encounters';
import { MONSTER_DETAILS_LIST } from './monsterDetailsList';
import { MONSTER_IMAGES } from './monsterImages';
import { MONSTERS } from './monsterList';
import { translateMonster } from './monsterTranslations';

export function Monster(monster) {
  if (isString(monster)) monster = getMonster(monster);
  return {
    ...monster,
    xp: parseInt(monster.xp, 10),
    challenge: getMonsterChallenge(monster),
    translation: translateMonster(monster.name),
  };
}

export function isMonster(m) {
  return !!m.details && !!m.environment;
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
    if (isString(monsterNames[0])) {
      return monsterNames.map(monsterName => getMonster(monsterName));
    }
    return monsterNames.map(monster => getMonster(monster.name));
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
  if (!env) return Object.values(MONSTERS).map(m => getMonster(m.name));
  return Object.values(MONSTERS)
    .filter(m => m.environment?.[env] === 'yes' && m.page.includes('mm'))
    .map(m => getMonster(m.name));
}

export function isMonsterSuitable(
  monster,
  numberOfMonsters,
  numberOfPcs,
  xpThreshold = 0,
  encounterXp = 0,
  partyMaxLevel
) {
  if (Monster(monster).challenge > partyMaxLevel) return false;

  const previousMultiplier = getXpMultiplierForMonsters(
    numberOfMonsters,
    numberOfPcs
  );
  const nextMultiplier = getXpMultiplierForMonsters(
    numberOfMonsters + 1,
    numberOfPcs
  );
  const xpRoom =
    xpThreshold - (encounterXp * nextMultiplier) / previousMultiplier;
  return xpRoom >= Monster(monster).xp * nextMultiplier;
}

function getMonsterChallenge(monster) {
  if (String(monster.challenge).includes('/')) {
    const values = monster.challenge.split('/');
    return values[0] / values[1];
  }

  return parseInt(monster.challenge, 10);
}

export function groupByCR(monsterList) {
  const monstersByCr = monsterList.reduce((groupedMonsters, monster) => {
    let crIndex = Monster(monster).challenge;
    crIndex = crIndex < 1 ? 0 : crIndex;
    groupedMonsters[crIndex] = groupedMonsters[crIndex] || [];
    groupedMonsters[crIndex].push(monster);
    return groupedMonsters;
  }, []);

  return monstersByCr.map(sortByXp);
}

export function sortByXp(monsterList) {
  return monsterList.sort((mA, mB) => Monster(mB).xp - Monster(mA).xp);
}

export const MONSTER_SIZES = [
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
];

export function translateSize(size) {
  switch (size) {
    case 'Tiny':
      return 'Diminuto';
    case 'Small':
      return 'Pequeño';
    case 'Medium':
      return 'Mediano';
    case 'Large':
      return 'Grande';
    case 'Huge':
      return 'Enorme';
    case 'Gargantuan':
      return 'Gigantesco';

    default:
      'unknown size';
  }
}

const NON_SPECIAL_SKILLS = [
  'actions',
  'legendaryActions',
  'Armor Class',
  'Hit Points',
  'Speed',
  'Skills',
  'Senses',
  'Languages',
  'Challenge',
  'stats',
  'notes',
];

export function getSpecialSkills(monster) {
  return Object.entries(monster.details).reduce(
    (specialSkills, [key, value]) => ({
      ...specialSkills,
      ...(NON_SPECIAL_SKILLS.includes(key) ? {} : { [key]: value }),
    }),
    {}
  );
}
