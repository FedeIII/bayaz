export const WARLOCK_SPELLS = {
  // LEVEL 0 //
  friends: {
    name: 'friends',
    translation: 'Amigos',
    type: 'warlock',
    level: 0,
  },
  bladeWard: {
    name: 'bladeWard',
    translation: 'Cuchilla protectora',
    type: 'warlock',
    level: 0,
  },
  eldritchBlast: {
    name: 'eldritchBlast',
    translation: 'Estadillo arcano',
    type: 'warlock',
    level: 0,
  },
  minorIllusion: {
    name: 'minorIllusion',
    translation: 'Ilusión menor',
    type: 'warlock',
    level: 0,
  },
  trueStrike: {
    name: 'trueStrike',
    translation: 'Impacto verdadero',
    type: 'warlock',
    level: 0,
  },
  mageHand: {
    name: 'mageHand',
    translation: 'Mano de mago',
    type: 'warlock',
    level: 0,
  },
  prestidigitation: {
    name: 'prestidigitation',
    translation: 'Prestidigitación',
    type: 'warlock',
    level: 0,
  },
  poisonSpray: {
    name: 'poisonSpray',
    translation: 'Rociada de veneno',
    type: 'warlock',
    level: 0,
  },
  chillTouch: {
    name: 'chillTouch',
    translation: 'Toque gélido',
    type: 'warlock',
    level: 0,
  },

  // LEVEL 1 //
  armorOfAgathys: {
    name: 'armorOfAgathys',
    translation: 'Armadura de Agathys',
    type: 'warlock',
    level: 1,
  },
  armsOfHadar: {
    name: 'armsOfHadar',
    translation: 'Brazos de Hadar',
    type: 'warlock',
    level: 1,
  },
  comprehendLanguages: {
    name: 'comprehendLanguages',
    translation: 'Comprensión idiomática',
    type: 'warlock',
    level: 1,
  },
  illusoryScript: {
    name: 'illusoryScript',
    translation: 'Escritura ilusoria',
    type: 'warlock',
    level: 1,
  },
  charmPerson: {
    name: 'charmPerson',
    translation: 'Hechizar persona',
    type: 'warlock',
    level: 1,
  },
  hex: {
    name: 'hex',
    translation: 'Mal de ojo',
    type: 'warlock',
    level: 1,
  },
  protectionFromEvilAndGood: {
    name: 'protectionFromEvilAndGood',
    translation: 'Protección contra el bien y el mal',
    type: 'warlock',
    level: 1,
  },
  hellishRebuke: {
    name: 'hellishRebuke',
    translation: 'Reprensión infernal',
    type: 'warlock',
    level: 1,
  },
  expeditiousRetreat: {
    name: 'expeditiousRetreat',
    translation: 'Retirada expeditiva',
    type: 'warlock',
    level: 1,
  },
  unseenServant: {
    name: 'unseenServant',
    translation: 'Sirviente invisible',
    type: 'warlock',
    level: 1,
  },
  witchBolt: {
    name: 'witchBolt',
    translation: 'Virote encantado',
    type: 'warlock',
    level: 1,
  },
  faerieFire: {
    name: 'faerieFire',
    translation: 'Fuego feérico (Archihada)',
    type: 'warlock',
    subtype: 'archfey',
    level: 1,
  },
  sleep: {
    name: 'sleep',
    translation: 'Dormir (Archihada)',
    type: 'warlock',
    subtype: 'archfey',
    level: 1,
  },
  burningHands: {
    name: 'burningHands',
    translation: 'Manos ardientes',
    type: 'warlock',
    subtype: 'fiend',
    level: 1,
  },
  command: {
    name: 'command',
    translation: 'Orden imperiosa',
    type: 'warlock',
    subtype: 'fiend',
    level: 1,
  },
  dissonantWhispers: {
    name: 'dissonantWhispers',
    translation: 'Susurros disonantes',
    type: 'warlock',
    subtype: 'greatOldOne',
    level: 1,
  },
  tashasHideousLaughter: {
    name: 'tashasHideousLaughter',
    translation: 'Terribles carcajadas de Tasha',
    type: 'warlock',
    subtype: 'greatOldOne',
    level: 1,
  },
};
function warlockSpellSlots(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
        /*  1 */ 1,
        /*  2 */ 2,
        /*  3 */ 2,
        /*  4 */ 2,
        /*  5 */ 2,
        /*  6 */ 2,
        /*  7 */ 2,
        /*  8 */ 2,
        /*  9 */ 2,
        /* 10 */ 2,
        /* 11 */ 3,
        /* 12 */ 3,
        /* 13 */ 3,
        /* 14 */ 3,
        /* 15 */ 3,
        /* 16 */ 3,
        /* 17 */ 4,
        /* 18 */ 4,
        /* 19 */ 4,
        /* 20 */ 4,
  ][level - 1];
}

export function getWarlockSpellSlotsLevel(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
        /*  1 */ 1,
        /*  2 */ 1,
        /*  3 */ 2,
        /*  4 */ 2,
        /*  5 */ 3,
        /*  6 */ 3,
        /*  7 */ 4,
        /*  8 */ 4,
        /*  9 */ 5,
        /* 10 */ 5,
        /* 11 */ 5,
        /* 12 */ 5,
        /* 13 */ 5,
        /* 14 */ 5,
        /* 15 */ 5,
        /* 16 */ 5,
        /* 17 */ 5,
        /* 18 */ 5,
        /* 19 */ 5,
        /* 20 */ 5,
  ][level - 1];
}

export function getWarlockSpellSlots(pc) {
  return [getWarlockCantripsNumber(pc), warlockSpellSlots(pc)];
}

export function getWarlockCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    2, 2, 2,
    3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
  ][level - 1];
}

export function getWarlockTotalSpells(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10,
    11, 11, 12, 12, 13, 13,
    14, 14, 15, 15
  ][level - 1];
}
