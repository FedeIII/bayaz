import { getItemProficiencies, getStat, getStatMod } from './characters';
import { ARMORS, getAllHeavyArmors } from './equipment/armors';
import { EXPLORERS_PACK, PRIESTS_PACK } from './equipment/packs';
import { TOOLS } from './equipment/tools';
import {
  getAllMartialMelee,
  getAllMartialRanged,
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from './equipment/weapons';

export const DIVINE_DOMAINS = {
  death: {},
  knowledge: {
    pickSkills: 2,
    skillsToPick: ['arcana', 'history', 'nature', 'religion'],
    specialSkillProficiencyBonus: bonus => 2 * bonus,
  },
  life: {
    proficientItems: [...getAllHeavyArmors().map(item => item.name)],
  },
  light: {},
  nature: {
    pickSkills: 1,
    skillsToPick: ['animal-handling', 'nature', 'survival'],
    proficientItems: [...getAllHeavyArmors().map(item => item.name)],
  },
  tempest: {
    proficientItems: [
      ...getAllMartialMelee().map(item => item.name),
      ...getAllMartialRanged().map(item => item.name),
      ...getAllHeavyArmors().map(item => item.name),
    ],
  },
  trickery: {},
  war: {
    proficientItems: [
      ...getAllMartialMelee().map(item => item.name),
      ...getAllMartialRanged().map(item => item.name),
      ...getAllHeavyArmors().map(item => item.name),
    ],
  },
};

export function translateDivineDomain(divineDomainName) {
  switch (divineDomainName) {
    case 'death':
      return 'Muerte';
    case 'knowledge':
      return 'Conocimiento';
    case 'life':
      return 'Vida';
    case 'light':
      return 'Luz';
    case 'nature':
      return 'Naturaleza';
    case 'tempest':
      return 'Tempestad';
    case 'trickery':
      return 'Superchería';
    case 'war':
      return 'Guerra';
    default:
      return 'unknown divine domain';
  }
}

export function getDivineDomain(pc) {
  return pc.classAttrs?.divineDomain;
}

export const CLERIC_EQUIPMENT = [
  {
    or: [
      WEAPONS.mace(),
      {
        item: WEAPONS.warhammer(),
        if: pc => getItemProficiencies(pc).includes('warhammer'),
      },
    ],
  },
  {
    or: [
      ARMORS.scaleMail(),
      ARMORS.leather(),
      {
        item: ARMORS.chainMail(),
        if: pc => getItemProficiencies(pc).includes('chainMail'),
      },
    ],
  },
  {
    or: [
      { and: [WEAPONS.lightCrossbow(), TOOLS.crossbowBolts({ amount: 20 })] },
      { or: [...getAllSimpleMelee(), ...getAllSimpleRanged()] },
    ],
  },
  { or: [PRIESTS_PACK, EXPLORERS_PACK] },
  ARMORS.shield(),
  TOOLS.holySymbol(),
];

export const CLERIC_SPELLS = {
  // LEVEL 0 //
  sacredFlame: {
    name: 'sacredFlame',
    translation: 'Llama sagrada',
    type: 'cleric',
    level: 0,
  },
  light: {
    name: 'light',
    translation: 'Luz',
    type: 'cleric',
    level: 0,
  },
  mending: {
    name: 'mending',
    translation: 'Remendar',
    type: 'cleric',
    level: 0,
  },
  resistance: {
    name: 'resistance',
    translation: 'Resistencia',
    type: 'cleric',
    level: 0,
  },
  guidance: {
    name: 'guidance',
    translation: 'Orientación divina',
    type: 'cleric',
    level: 0,
  },
  spareTheDying: {
    name: 'spareTheDying',
    translation: 'Perdonar la vida',
    type: 'cleric',
    level: 0,
  },
  thaumaturgy: {
    name: 'thaumaturgy',
    translation: 'Taumaturgia',
    type: 'cleric',
    level: 0,
  },

  // LEVEL 1 //
  bless: {
    name: 'bless',
    translation: 'Bendecir',
    type: 'cleric',
    level: 1,
  },
  createOrDestroyWater: {
    name: 'createOrDestroyWater',
    translation: 'Crear o destruir agua',
    type: 'cleric',
    level: 1,
  },
  cureWounds: {
    name: 'cureWounds',
    translation: 'Curar heridas',
    type: 'cleric',
    level: 1,
  },
  detectEvilAndGood: {
    name: 'detectEvilAndGood',
    translation: 'Detectar el bien y el mal',
    type: 'cleric',
    level: 1,
  },
  detectMagic: {
    name: 'detectMagic',
    translation: 'Detectar magia',
    type: 'cleric',
    level: 1,
  },
  detectPoisonAndDisease: {
    name: 'detectPoisonAndDisease',
    translation: 'Detectar venenos y enfermedades',
    type: 'cleric',
    level: 1,
  },
  shieldOfFaith: {
    name: 'shieldOfFaith',
    translation: 'Escudo de la fe',
    type: 'cleric',
    level: 1,
  },
  inflictWounds: {
    name: 'inflictWounds',
    translation: 'Infligir heridas',
    type: 'cleric',
    level: 1,
  },
  command: {
    name: 'command',
    translation: 'Orden imperiosa',
    type: 'cleric',
    level: 1,
  },
  healingWord: {
    name: 'healingWord',
    translation: 'Palabra sanadora',
    type: 'cleric',
    level: 1,
  },
  bane: {
    name: 'bane',
    translation: 'Perdición',
    type: 'cleric',
    level: 1,
  },
  protectionFromEvilAndGood: {
    name: 'protectionFromEvilAndGood',
    translation: 'Protección contra el bien y el mal',
    type: 'cleric',
    level: 1,
  },
  purifyFoodAndDrink: {
    name: 'purifyFoodAndDrink',
    translation: 'Purificar comida y bebida',
    type: 'cleric',
    level: 1,
  },
  guidingBolt: {
    name: 'guidingBolt',
    translation: 'Rayo guiado',
    type: 'cleric',
    level: 1,
  },
  sanctuary: {
    name: 'sanctuary',
    translation: 'Santuario',
    type: 'cleric',
    level: 1,
  },
};

function clericSpellSlots(pc) {
  const { level } = pc;
  return [
    /*  1 */ [2],
    /*  2 */ [3],
    /*  3 */ [4, 2],
    /*  4 */ [4, 3],
    /*  5 */ [4, 3, 2],
    /*  6 */ [4, 3, 3],
    /*  7 */ [4, 3, 3, 1],
    /*  8 */ [4, 3, 3, 2],
    /*  9 */ [4, 3, 3, 3, 1],
    /* 10 */ [4, 3, 3, 3, 2],
    /* 11 */ [4, 3, 3, 3, 2, 1],
    /* 12 */ [4, 3, 3, 3, 2, 1],
    /* 13 */ [4, 3, 3, 3, 2, 1, 1],
    /* 14 */ [4, 3, 3, 3, 2, 1, 1],
    /* 15 */ [4, 3, 3, 3, 2, 1, 1, 1],
    /* 16 */ [4, 3, 3, 3, 2, 1, 1, 1],
    /* 17 */ [4, 3, 3, 3, 2, 1, 1, 1, 1],
    /* 18 */ [4, 3, 3, 3, 3, 1, 1, 1, 1],
    /* 19 */ [4, 3, 3, 3, 3, 2, 1, 1, 1],
    /* 20 */ [4, 3, 3, 3, 3, 2, 2, 1, 1],
  ][level - 1];
}

export function getClericCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    3,3,3,
    4,4,4,4,4,4,
    5,5,5,5,5,5,5,5,5,5,5,
  ][level - 1];
}

export function getClericSpellSlots(pc) {
  return [getClericCantripsNumber(pc), ...clericSpellSlots(pc)];
}

export function getClericTotalSpells(pc) {
  const { level } = pc;

  const totalSpells = getStatMod(getStat(pc, 'wis')) + level;
  return totalSpells > 1 ? totalSpells : 1;
}
