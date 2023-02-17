export const SORCERER_SPELLS = {
  // LEVEL 0 //
  friends: {
    name: 'friends',
    translation: 'Amigos',
    type: 'sorcerer',
    level: 0,
  },
  shockingGrasp: {
    name: 'shockingGrasp',
    translation: 'Contacto electrizante',
    type: 'sorcerer',
    level: 0,
  },
  bladeWard: {
    name: 'bladeWard',
    translation: 'Cuchilla protectora',
    type: 'sorcerer',
    level: 0,
  },
  minorIllusion: {
    name: 'minorIllusion',
    translation: 'Ilusión menor',
    type: 'sorcerer',
    level: 0,
  },
  trueStrike: {
    name: 'trueStrike',
    translation: 'Impacto verdadero',
    type: 'sorcerer',
    level: 0,
  },
  dancingLights: {
    name: 'dancingLights',
    translation: 'Luces danzantes',
    type: 'sorcerer',
    level: 0,
  },
  light: {
    name: 'light',
    translation: 'Luz',
    type: 'sorcerer',
    level: 0,
  },
  mageHand: {
    name: 'mageHand',
    translation: 'Mano de mago',
    type: 'sorcerer',
    level: 0,
  },
  message: {
    name: 'message',
    translation: 'Mensaje',
    type: 'sorcerer',
    level: 0,
  },
  prestidigitation: {
    name: 'prestidigitation',
    translation: 'Prestidigitación',
    type: 'sorcerer',
    level: 0,
  },
  rayOfFrost: {
    name: 'rayOfFrost',
    translation: 'Rayo de escarcha',
    type: 'sorcerer',
    level: 0,
  },
  mending: {
    name: 'mending',
    translation: 'Remendar',
    type: 'sorcerer',
    level: 0,
  },
  poisonSpray: {
    name: 'poisonSpray',
    translation: 'Rociada de veneno',
    type: 'sorcerer',
    level: 0,
  },
  firebolt: {
    name: 'firebolt',
    translation: 'Saeta de fuego',
    type: 'sorcerer',
    level: 0,
  },
  acidSplash: {
    name: 'acidSplash',
    translation: 'Salpicadura de ácido',
    type: 'sorcerer',
    level: 0,
  },
  chillTouch: {
    name: 'chillTouch',
    translation: 'Toque gélido',
    type: 'sorcerer',
    level: 0,
  },

  // LEVEL 1 //
  mageArmor: {
    name: 'mageArmor',
    translation: 'Armadura de mago',
    type: 'sorcerer',
    level: 1,
  },
  featherFall: {
    name: 'featherFall',
    translation: 'Caída de pluma',
    type: 'sorcerer',
    level: 1,
  },
  comprehendLanguages: {
    name: 'comprehendLanguages',
    translation: 'Comprensión idiomática',
    type: 'sorcerer',
    level: 1,
  },
  detectMagic: {
    name: 'detectMagic',
    translation: 'Detectar magia',
    type: 'sorcerer',
    level: 1,
  },
  disguiseSelf: {
    name: 'disguiseSelf',
    translation: 'Disfrazarse',
    type: 'sorcerer',
    level: 1,
  },
  sleep: {
    name: 'sleep',
    translation: 'Dormir',
    type: 'sorcerer',
    level: 1,
  },
  shield: {
    name: 'shield',
    translation: 'Escudo',
    type: 'sorcerer',
    level: 1,
  },
  charmPerson: {
    name: 'charmPerson',
    translation: 'Hechizar persona',
    type: 'sorcerer',
    level: 1,
  },
  silentImage: {
    name: 'silentImage',
    translation: 'Imagen silenciosa',
    type: 'sorcerer',
    level: 1,
  },
  burningHands: {
    name: 'burningHands',
    translation: 'Manos ardientes',
    type: 'sorcerer',
    level: 1,
  },
  fogCloud: {
    name: 'fogCloud',
    translation: 'Nube Brumosa',
    type: 'sorcerer',
    level: 1,
  },
  thunderwave: {
    name: 'thunderwave',
    translation: 'Onda atronadora',
    type: 'sorcerer',
    level: 1,
  },
  chromaticOrb: {
    name: 'chromaticOrb',
    translation: 'Orbe cromático',
    type: 'sorcerer',
    level: 1,
  },
  magicMissile: {
    name: 'magicMissile',
    translation: 'Proyectil mágico',
    type: 'sorcerer',
    level: 1,
  },
  rayOfSickness: {
    name: 'rayOfSickness',
    translation: 'Rayo de dolencia',
    type: 'sorcerer',
    level: 1,
  },
  expeditiousRetreat: {
    name: 'expeditiousRetreat',
    translation: 'Retirada expeditiva',
    type: 'sorcerer',
    level: 1,
  },
  colorSpray: {
    name: 'colorSpray',
    translation: 'Rociada de color',
    type: 'sorcerer',
    level: 1,
  },
  jump: {
    name: 'jump',
    translation: 'Salto',
    type: 'sorcerer',
    level: 1,
  },
  falseLife: {
    name: 'falseLife',
    translation: 'Vida falsa',
    type: 'sorcerer',
    level: 1,
  },
  witchBolt: {
    name: 'witchBolt',
    translation: 'Virote encantado',
    type: 'sorcerer',
    level: 1,
  },
};

function sorcererSpellSlots(pc) {
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

export function getSorcererSpellSlots(pc) {
  return [getSorcererCantripsNumber(pc), ...sorcererSpellSlots(pc)];
}

export function getSorcererCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    4,4,4,
    5,5,5,5,5,5,
    6,6,6,6,6,6,6,6,6,6,6
  ][level - 1];
}

export function getSorcererTotalSpells(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    2,3,4,5,6,7,8,9,10,11,
    12,12,13,13,14,14,
    15,15,15,15,
  ][level - 1]
}
