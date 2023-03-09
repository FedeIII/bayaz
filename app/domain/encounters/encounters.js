import random from '~/domain/random';
import { MONSTERS } from './monsterList';
import { Monster } from './monsters';
import { translateMonster } from './monsterTranslations';

export const CHARACTER_XP_THRESHOLDS = [
  { easy: 25, medium: 50, hard: 75, deadly: 100 },
  { easy: 50, medium: 100, hard: 150, deadly: 200 },
  { easy: 75, medium: 150, hard: 225, deadly: 400 },
  { easy: 125, medium: 250, hard: 375, deadly: 500 },
  { easy: 250, medium: 500, hard: 750, deadly: 1100 },
  { easy: 300, medium: 600, hard: 900, deadly: 1400 },
  { easy: 350, medium: 750, hard: 1100, deadly: 1700 },
  { easy: 450, medium: 900, hard: 1400, deadly: 2100 },
  { easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
  { easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
  { easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
  { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
  { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
  { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
  { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
  { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
  { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
  { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
  { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
  { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 },
];

export function translateDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 'Fácil';
    case 'medium':
      return 'Normal';
    case 'hard':
      return 'Difícil';
    case 'deadly':
      return 'Mortal';

    default:
      break;
  }
}

export function getCharacterXpThreshold(pc, difficulty) {
  const { level } = pc;

  return CHARACTER_XP_THRESHOLDS[level - 1][difficulty];
}

export function getXpMultiplierForMonsters(numberOfMonsters, numberOfPcs) {
  if (numberOfPcs >= 6) {
    if (numberOfMonsters >= 15) return 3;
    if (numberOfMonsters >= 11) return 2.5;
    if (numberOfMonsters >= 7) return 2;
    if (numberOfMonsters >= 3) return 1.5;
    if (numberOfMonsters === 2) return 1;
    return 0.5;
  }

  if (numberOfPcs >= 3) {
    if (numberOfMonsters >= 15) return 4;
    if (numberOfMonsters >= 11) return 3;
    if (numberOfMonsters >= 7) return 2.5;
    if (numberOfMonsters >= 3) return 2;
    if (numberOfMonsters === 2) return 1.5;
    return 1;
  }

  if (numberOfPcs > 0) {
    if (numberOfMonsters >= 15) return 5;
    if (numberOfMonsters >= 11) return 4;
    if (numberOfMonsters >= 7) return 3;
    if (numberOfMonsters >= 3) return 2.5;
    if (numberOfMonsters === 2) return 2;
    return 1.5;
  }
}

export function getPartyXpThreshold(pcs, difficulty) {
  return pcs.reduce(
    (xp, pc) => xp + getCharacterXpThreshold(pc, difficulty),
    0
  );
}

function getRandomMonster(xpMultiplier, xpPerMonster, env, maxLevel) {
  const monsterList = Object.values(MONSTERS).filter(
    m =>
      Monster(m).xp * xpMultiplier <= xpPerMonster * 1.1 &&
      Monster(m).xp * xpMultiplier >= xpPerMonster * 0.75 &&
      m.environment?.[env] === 'yes' &&
      m.page.includes('mm') &&
      Monster(m).challenge <= maxLevel
  );

  return monsterList[Math.floor(Math.random() * monsterList.length)];
}

function getRandomEncounterSameMonsters(
  pcs,
  difficulty,
  partyXpThreshold,
  numberOfMonsters,
  env
) {
  const xpMultiplier = getXpMultiplierForMonsters(numberOfMonsters, pcs.length);
  const xpPerMonster = partyXpThreshold / numberOfMonsters;

  const monster = getRandomMonster(
    xpMultiplier,
    xpPerMonster,
    env,
    Math.max(...pcs.map(pc => pc.level))
  );

  if (
    !monster ||
    Monster(monster).xp === 0 ||
    Monster(monster).challenge === 0
  ) {
    return getRandomEncounter(pcs, difficulty, env);
  }

  console.log('///////////////////////////////');
  console.log('partyXpThreshold:', partyXpThreshold);
  console.log(monster.name, monster.xp);
  console.log('numberOfMonsters:', numberOfMonsters);
  console.log('multiplier:', xpMultiplier);
  console.log('total:', monster.xp * xpMultiplier * numberOfMonsters);

  return Array(numberOfMonsters).fill(monster);
}

function getRandomEncounterLeadMonster(
  pcs,
  difficulty,
  partyXpThreshold,
  numberOfMonsters,
  env
) {
  const xpMultiplier = getXpMultiplierForMonsters(numberOfMonsters, pcs.length);
  const leadMonsterXp = partyXpThreshold / 2;

  const leadMonster = getRandomMonster(
    xpMultiplier,
    leadMonsterXp,
    env,
    Math.max(...pcs.map(pc => pc.level))
  );

  if (
    !leadMonster ||
    Monster(leadMonster).xp === 0 ||
    Monster(leadMonster).challenge === 0
  ) {
    return getRandomEncounter(pcs, difficulty, env);
  }

  const remainingPartyXpThreshold =
    partyXpThreshold - Monster(leadMonster).xp * xpMultiplier;

  const xpPerMob = remainingPartyXpThreshold / (numberOfMonsters - 1);

  const mob = getRandomMonster(
    xpMultiplier,
    xpPerMob,
    env,
    Math.max(...pcs.map(pc => pc.level))
  );

  if (!mob || Monster(mob).xp === 0 || Monster(mob).challenge === 0) {
    if (numberOfMonsters === 1) {
      return getRandomEncounterSameMonsters(
        pcs,
        difficulty,
        partyXpThreshold,
        numberOfMonsters,
        env
      );
    } else {
      return getRandomEncounterLeadMonster(
        pcs,
        difficulty,
        partyXpThreshold,
        numberOfMonsters - 1,
        env
      );
    }
  }
  console.log('///////////////////////////////');
  console.log('partyXpThreshold:', partyXpThreshold);
  console.log(leadMonster.name, leadMonster.xp);
  console.log(mob.name, mob.xp);
  console.log('numberOfMonsters:', numberOfMonsters);
  console.log('multiplier:', xpMultiplier);
  console.log(
    `total: ${leadMonster.xp} * ${xpMultiplier} + ${
      mob.xp
    } * ${xpMultiplier} * ${numberOfMonsters - 1} = ${
      Monster(leadMonster).xp * xpMultiplier +
      Monster(mob).xp * xpMultiplier * (numberOfMonsters - 1)
    }`
  );

  const monsterList = Array(numberOfMonsters - 1).fill(mob);
  return [leadMonster, ...monsterList];
}

export function getRandomEncounter(pcs, difficulty, env) {
  const numberOfMonsters = random.monsterDistribution();
  const partyXpThreshold = getPartyXpThreshold(pcs, difficulty);

  if (numberOfMonsters === 1 || Math.random() > 0.5) {
    return getRandomEncounterSameMonsters(
      pcs,
      difficulty,
      partyXpThreshold,
      numberOfMonsters,
      env
    );
  } else {
    return getRandomEncounterLeadMonster(
      pcs,
      difficulty,
      partyXpThreshold,
      numberOfMonsters,
      env
    );
  }
}

export function groupMonsters(monsterList = []) {
  return Object.entries(
    monsterList.reduce(
      (groupedMonsters, monster) => ({
        ...groupedMonsters,
        [monster.name]: groupedMonsters[monster.name]
          ? groupedMonsters[monster.name] + 1
          : 1,
      }),
      {}
    )
  )
    .map(([monsterName, amount]) =>
      amount > 1
        ? amount + 'x ' + translateMonster(monsterName)
        : translateMonster(monsterName)
    )
    .join(', ');
}

export const ENVIRONMENTS = [
  'Arctic',
  'Coastal',
  'Desert',
  'Forest',
  'Grassland',
  'Hill',
  'Jungle',
  'Mountain',
  'Swamp',
  'Underdark',
  'Underwater',
  'Urban',
];

export function translateEnvironments(environment) {
  switch (environment) {
    case 'Arctic':
      return 'Ártico';
    case 'Coastal':
      return 'Costa';
    case 'Desert':
      return 'Desierto';
    case 'Forest':
      return 'Bosque';
    case 'Grassland':
      return 'Pradera';
    case 'Hill':
      return 'Colinas';
    case 'Jungle':
      return 'Jungla';
    case 'Mountain':
      return 'Montaña';
    case 'Swamp':
      return 'Pantano';
    case 'Underdark':
      return 'Infraoscuridad';
    case 'Underwater':
      return 'Subacuático';
    case 'Urban':
      return 'Urbano';

    default:
      break;
  }
}

export function getEncounterXp(monsters) {
  return monsters.reduce((xp, monster) => xp + Monster(monster).xp, 0);
}

export function getEncounterChallenge(monsters) {
  if (!monsters.length) return 0;
  return Math.max(...monsters.map(monster => Monster(monster).challenge));
}
