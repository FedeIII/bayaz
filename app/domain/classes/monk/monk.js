import { getEquippedArmor } from '~/domain/equipment/equipment';
import { DUNGEONEERS_PACK, EXPLORERS_PACK } from '../../equipment/packs';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from '../../equipment/weapons';
import { CLASSES } from '~/domain/characters';
import { displayTrait } from '~/domain/display';
import { getSpell } from '~/domain/spells/getSpells';

export const MONK_EQUIPMENT = [
  {
    or: [WEAPONS.shortsword(), ...getAllSimpleMelee(), ...getAllSimpleRanged()],
  },
  { or: [DUNGEONEERS_PACK, EXPLORERS_PACK] },
  WEAPONS.dart({ amount: 10 }),
  WEAPONS.martialArts({ amount: 1 }),
];

export function isMonkWeapon(weapon) {
  const {
    name,
    subtype,
    properties: { twoHanded, heavy },
  } = weapon;

  return (
    name === 'shortsword' || (subtype === 'simpleMelee' && !twoHanded && !heavy)
  );
}

export function getMartialArtsDice(pc) {
  const { level } = pc;

  return level >= 17
    ? '1d10'
    : level >= 11
    ? '1d8'
    : level >= 5
    ? '1d6'
    : '1d4';
}

export function getKiPoints(pc) {
  const { level } = pc;

  return level === 1 ? 0 : level > 20 ? 20 : level;
}

export function getExtraUnarmoredMovement(pc) {
  const { level } = pc;

  if (getEquippedArmor(pc)) return 0;

  return [
    /*  1 */ 0, /*  2 */ 3, /*  3 */ 3, /*  4 */ 3, /*  5 */ 3, /*  6 */ 5,
    /*  7 */ 5, /*  8 */ 5, /*  9 */ 5, /* 10 */ 6, /* 11 */ 6, /* 12 */ 6,
    /* 13 */ 6, /* 14 */ 8, /* 15 */ 8, /* 16 */ 8, /* 17 */ 8, /* 18 */ 10,
    /* 19 */ 10, /* 20 */ 10,
  ][level - 1];
}

export const MONASTIC_TRADITIONS = [
  'wayOfTheFourElements',
  'openHand',
  'wayOfShadow',
];

export function translateMonasticTradition(tradition) {
  if (tradition === 'wayOfTheFourElements')
    return 'Camino de los Cuatro Elementos';
  if (tradition === 'openHand') return 'Camino de la Mano Abierta';
  if (tradition === 'wayOfShadow') return 'Camino de la Sombra';
  return 'unknown monastic tradition';
}

export function getMonasticTradition(pc) {
  return pc.classAttrs?.monk?.monasticTradition || null;
}

export function getMonasticTraditionTraits(pc) {
  const { level } = pc;
  const monasticTradition = getMonasticTradition(pc);

  return Object.entries(
    Object.entries(CLASSES.monk.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? {
              ...(levelSkills.monasticTradition?.all?.traits || {}),
              ...(levelSkills.monasticTradition?.[monasticTradition]?.traits ||
                {}),
            }
          : {}),
      }),
      {}
    )
  ).filter(t => !!displayTrait(t[0], t[1], pc));
}

export function maxKiPointsForSpell(pc) {
  const { level } = pc;

  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;

  return 0;
}

export function getMonasticTraditionCantrips(pc) {
  if (pc.classAttrs?.monk?.monasticTradition === 'wayOfShadow') {
    return [getSpell('minorIllusion')];
  }

  return [];
}

export function getMonkSpells(pc) {
  const spells = [];

  if (pc.classAttrs?.monk?.monasticTradition === 'wayOfShadow') {
    spells.push(
      getSpell('darkness'),
      getSpell('darkvision'),
      getSpell('passWithoutTrace'),
      getSpell('silence')
    );
  }

  if (pc.classAttrs?.monk?.monasticTradition === 'wayOfTheFourElements') {
    spells.push(
      ...getElementalDisciplines(pc)
        .map(disciplineName =>
          getSpell(ELEMENTAL_DISCIPLINES[disciplineName].spell)
        )
        .filter(s => s)
    );
  }

  return spells;
}

export function getElementalDisciplines(pc) {
  return pc.classAttrs?.monk?.elementalDisciplines || [];
}

export function hasToLearnElementalDiscipline(pc) {
  const monasticTradicion = getMonasticTradition(pc);
  const elementalDisciplines = getElementalDisciplines(pc);

  if (monasticTradicion === 'wayOfTheFourElements') {
    if (pc.level >= 17) return elementalDisciplines.length < 5;
    if (pc.level >= 11) return elementalDisciplines.length < 4;
    if (pc.level >= 6) return elementalDisciplines.length < 3;
    else return elementalDisciplines.length < 2;
  }
}

/* prettier-ignore */
export const ELEMENTAL_DISCIPLINES = {
  breathOfWinter: {
    name: 'breathOfWinter', level: 17, ki: 6, extraKi: 0, spell: 'coneOfCold',
  },
  clenchOfTheNorthWind: {
    name: 'clenchOfTheNorthWind', level: 6, ki: 3, extraKi: 0, spell: 'holdPerson',
  },
  elementalAttunement: {
    name: 'elementalAttunement', level: 1, ki: 1, extraKi: 0, spell: null,
  },
  eternalMountainDefense: {
    name: 'eternalMountainDefense', level: 11, ki: 5, extraKi: 0, spell: 'stoneskin',
  },
  fangsOfTheFireSnake: {
    name: 'fangsOfTheFireSnake', level: 1, ki: 1, extraKi: 1, spell: null,
  },
  fistOfFourThunders: {
    name: 'fistOfFourThunders', level: 1, ki: 2, extraKi: 0, spell: 'thunderwave',
  },
  fistOfUnbrokenAir: {
    name: 'fistOfUnbrokenAir', level: 1, ki: 2, extraKi: 'n', spell: null,
  },
  flamesOfThePhoenix: {
    name: 'flamesOfThePhoenix', level: 11, ki: 4, extraKi: 0, spell: 'fireball',
  },
  gongOfTheSummit: {
    name: 'gongOfTheSummit', level: 6, ki: 5, extraKi: 0, spell: 'shatter',
  },
  mistStance: {
    name: 'mistStance', level: 11, ki: 4, extraKi: 0, spell: 'gaseousForm',
  },
  rideTheWind: {
    name: 'rideTheWind', level: 11, ki: 4, extraKi: 0, spell: 'fly',
  },
  riverOfHungryFlame: {
    name: 'riverOfHungryFlame', level: 17, ki: 5, extraKi: 0, spell: 'wallOfFire',
  },
  rushOfTheGaleSpirits: {
    name: 'rushOfTheGaleSpirits', level: 1, ki: 2, extraKi: 0, spell: 'gustOfWind',
  },
  shapeTheFlowingRiver: {
    name: 'shapeTheFlowingRiver', level: 1, ki: 1, extraKi: 0, spell: null,
  },
  sweepingCinderStrike: {
    name: 'sweepingCinderStrike', level: 1, ki: 2, extraKi: 0, spell: 'burningHands',
  },
  waterWhip: {
    name: 'waterWhip', level: 1, ki: 2, extraKi: 'n', spell: null,
  },
  waveOfRollingEarth: {
    name: 'waveOfRollingEarth', level: 17, ki: 6, extraKi: 0, spell: 'wallOfStone',
  },
};

export function translateElementalDisciplines(discipline) {
  switch (discipline) {
    case 'breathOfWinter':
      return 'Aliento de Invierno';
    case 'clenchOfTheNorthWind':
      return 'Presa del Viento del Norte';
    case 'elementalAttunement':
      return 'Sintonía Elemental';
    case 'eternalMountainDefense':
      return 'Defensa de la Eterna Montaña';
    case 'fangsOfTheFireSnake':
      return 'Fauces de la Serpiente de Fuego';
    case 'fistOfFourThunders':
      return 'Puño de los Cuatro Truenos';
    case 'fistOfUnbrokenAir':
      return 'Puño del Aire Indómito';
    case 'flamesOfThePhoenix':
      return 'Llamas del Fénix';
    case 'gongOfTheSummit':
      return 'Gong de la Cumbre';
    case 'mistStance':
      return 'Postura de Niebla';
    case 'rideTheWind':
      return 'Cabalgar el Viento';
    case 'riverOfHungryFlame':
      return 'Rio del Fuego Hambriento';
    case 'rushOfTheGaleSpirits':
      return 'Ímpetu del Vendaval Espiritual';
    case 'shapeTheFlowingRiver':
      return 'Forma del Río que Fluye';
    case 'sweepingCinderStrike':
      return 'Barrido de Cenizas';
    case 'waterWhip':
      return 'Látigo de Agua';
    case 'waveOfRollingEarth':
      return 'Ola de la Tierra Rodante';

    default:
      return 'unknown discipline';
  }
}

export function getMaxKiPerSpell(pc) {
  const { level } = pc;
  return level >= 17
    ? 6
    : level >= 13
    ? 5
    : level >= 9
    ? 4
    : level >= 5
    ? 3
    : 2;
}
