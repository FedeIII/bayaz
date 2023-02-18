import { getStat, getStatMod } from "../characters";

export const DRUID_SPELLS = {
  // LEVEL 0 //
  produceFlame: {
    name: 'produceFlame',
    translation: 'Flamear',
    type: 'druid',
    level: 0,
  },
  shillelagh: {
    name: 'shillelagh',
    translation: 'Garrote',
    type: 'druid',
    level: 0,
  },
  thornWhip: {
    name: 'thornWhip',
    translation: 'Látigo de espinas',
    type: 'druid',
    level: 0,
  },
  druidcraft: {
    name: 'druidcraft',
    translation: 'Magia druídica',
    type: 'druid',
    level: 0,
  },
  guidance: {
    name: 'guidance',
    translation: 'Orientación divina',
    type: 'druid',
    level: 0,
  },
  mending: {
    name: 'mending',
    translation: 'Remendar',
    type: 'druid',
    level: 0,
  },
  resistance: {
    name: 'resistance',
    translation: 'Resistencia',
    type: 'druid',
    level: 0,
  },
  poisonSpray: {
    name: 'poisonSpray',
    translation: 'Rociada de veneno',
    type: 'druid',
    level: 0,
  },

  // LEVEL 1 //
  animalFriendship: {
    name: 'animalFriendship',
    translation: 'Amistad con los animales',
    type: 'druid',
    level: 1,
  },
  goodberry: {
    name: 'goodberry',
    translation: 'Buenas bayas',
    type: 'druid',
    level: 1,
  },
  createOrDestroyWater: {
    name: 'createOrDestroyWater',
    translation: 'Crear o destruir agua',
    type: 'druid',
    level: 1,
  },
  cureWounds: {
    name: 'cureWounds',
    translation: 'Curar heridas',
    type: 'druid',
    level: 1,
  },
  detectMagic: {
    name: 'detectMagic',
    translation: 'Detectar magia',
    type: 'druid',
    level: 1,
  },
  detectPoisonAndDisease: {
    name: 'detectPoisonAndDisease',
    translation: 'Detectar venenos y enfermedades',
    type: 'druid',
    level: 1,
  },
  entangle: {
    name: 'entangle',
    translation: 'Enmarañar',
    type: 'druid',
    level: 1,
  },
  faerieFire: {
    name: 'faerieFire',
    translation: 'Fuego feérico',
    type: 'druid',
    level: 1,
  },
  speakWithAnimals: {
    name: 'speakWithAnimals',
    translation: 'Hablar con los animales',
    type: 'druid',
    level: 1,
  },
  charmPerson: {
    name: 'charmPerson',
    translation: 'Hechizar persona',
    type: 'druid',
    level: 1,
  },
  fogCloud: {
    name: 'fogCloud',
    translation: 'Nube brumosa',
    type: 'druid',
    level: 1,
  },
  thunderwave: {
    name: 'thunderwave',
    translation: 'Onda atronadora',
    type: 'druid',
    level: 1,
  },
  healingWord: {
    name: 'healingWord',
    translation: 'Palabra sanadora',
    type: 'druid',
    level: 1,
  },
  purifyFoodAndDrink: {
    name: 'purifyFoodAndDrink',
    translation: 'Purificar comida y bebida',
    type: 'druid',
    level: 1,
  },
  jump: {
    name: 'jump',
    translation: 'Salto',
    type: 'druid',
    level: 1,
  },
  longstrider: {
    name: 'longstrider',
    translation: 'Zancada prodigiosa',
    type: 'druid',
    level: 1,
  },
};

function druidSpellSlots(pc) {
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

export function getDruidCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    3, 3, 3,
    4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  ][level - 1];
}

export function getDruidSpellSlots(pc) {
  return [getDruidCantripsNumber(pc), ...druidSpellSlots(pc)];
}

export function getDruidTotalSpells(pc) {
  const { level } = pc;

  const totalSpells = getStatMod(getStat(pc, 'wis')) + level;
  return totalSpells > 1 ? totalSpells : 1;
}
