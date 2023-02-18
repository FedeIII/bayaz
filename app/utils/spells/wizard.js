import { getStat, getStatMod } from '../characters';

export const WIZARD_SPELLS = {
  // LEVEL 0 //
  friends: {
    name: 'friends',
    translation: 'Amigos',
    type: 'wizard',
    level: 0,
  },
  shockingGrasp: {
    name: 'shockingGrasp',
    translation: 'Contacto electrizante',
    type: 'wizard',
    level: 0,
  },
  bladeWard: {
    name: 'bladeWard',
    translation: 'Cuchilla protectora',
    type: 'wizard',
    level: 0,
  },
  minorIllusion: {
    name: 'minorIllusion',
    translation: 'Ilusión menor',
    type: 'wizard',
    level: 0,
  },
  trueStrike: {
    name: 'trueStrike',
    translation: 'Impacto verdadero',
    type: 'wizard',
    level: 0,
  },
  dancingLights: {
    name: 'dancingLights',
    translation: 'Luces danzantes',
    type: 'wizard',
    level: 0,
  },
  light: {
    name: 'light',
    translation: 'Luz',
    type: 'wizard',
    level: 0,
  },
  mageHand: {
    name: 'mageHand',
    translation: 'Mano de mago',
    type: 'wizard',
    level: 0,
  },
  message: {
    name: 'message',
    translation: 'Mensaje',
    type: 'wizard',
    level: 0,
  },
  prestidigitation: {
    name: 'prestidigitation',
    translation: 'Prestidigitación',
    type: 'wizard',
    level: 0,
  },
  rayOfFrost: {
    name: 'rayOfFrost',
    translation: 'Rayo de escarcha',
    type: 'wizard',
    level: 0,
  },
  mending: {
    name: 'mending',
    translation: 'Remendar',
    type: 'wizard',
    level: 0,
  },
  poisonSpray: {
    name: 'poisonSpray',
    translation: 'Rociada de veneno',
    type: 'wizard',
    level: 0,
  },
  firebolt: {
    name: 'firebolt',
    translation: 'Saeta de fuego',
    type: 'wizard',
    level: 0,
  },
  acidSplash: {
    name: 'acidSplash',
    translation: 'Salpicadura de ácido',
    type: 'wizard',
    level: 0,
  },
  chillTouch: {
    name: 'chillTouch',
    translation: 'Toque gélido',
    type: 'wizard',
    level: 0,
  },

  // LEVEL 1 //
  alarm: {
    name: 'alarm',
    translation: 'Alarma',
    type: 'wizard',
    level: 1,
  },
  mageArmor: {
    name: 'mageArmor',
    translation: 'Armadura de mago',
    type: 'wizard',
    level: 1,
  },
  featherFall: {
    name: 'featherFall',
    translation: 'Caída de pluma',
    type: 'wizard',
    level: 1,
  },
  comprehendLanguages: {
    name: 'comprehendLanguages',
    translation: 'Comprensión idiomática',
    type: 'wizard',
    level: 1,
  },
  detectMagic: {
    name: 'detectMagic',
    translation: 'Detectar magia',
    type: 'wizard',
    level: 1,
  },
  tensersFloatingDisk: {
    name: 'tensersFloatingDisk',
    translation: 'Disco flotante de Tenser',
    type: 'wizard',
    level: 1,
  },
  disguiseSelf: {
    name: 'disguiseSelf',
    translation: 'Disfrazarse',
    type: 'wizard',
    level: 1,
  },
  sleep: {
    name: 'sleep',
    translation: 'Dormir',
    type: 'wizard',
    level: 1,
  },
  findFamiliar: {
    name: 'findFamiliar',
    translation: 'Encontrar familiar',
    type: 'wizard',
    level: 1,
  },
  illusoryScript: {
    name: 'illusoryScript',
    translation: 'Escritura ilusoria',
    type: 'wizard',
    level: 1,
  },
  shield: {
    name: 'shield',
    translation: 'Escudo',
    type: 'wizard',
    level: 1,
  },
  grease: {
    name: 'grease',
    translation: 'Grasa',
    type: 'wizard',
    level: 1,
  },
  charmPerson: {
    name: 'charmPerson',
    translation: 'Hechizar persona',
    type: 'wizard',
    level: 1,
  },
  identify: {
    name: 'identify',
    translation: 'Identificar',
    type: 'wizard',
    level: 1,
  },
  silentImage: {
    name: 'silentImage',
    translation: 'Imagen silenciosa',
    type: 'wizard',
    level: 1,
  },
  burningHands: {
    name: 'burningHands',
    translation: 'Manos ardientes',
    type: 'wizard',
    level: 1,
  },
  fogCloud: {
    name: 'fogCloud',
    translation: 'Nube brumosa',
    type: 'wizard',
    level: 1,
  },
  thunderwave: {
    name: 'thunderwave',
    translation: 'Onda atronadora',
    type: 'wizard',
    level: 1,
  },
  chromaticOrb: {
    name: 'chromaticOrb',
    translation: 'Orbe cromático',
    type: 'wizard',
    level: 1,
  },
  protectionFromEvilAndGood: {
    name: 'protectionFromEvilAndGood',
    translation: 'Protección contra el bien y el mal',
    type: 'wizard',
    level: 1,
  },
  magicMissile: {
    name: 'magicMissile',
    translation: 'Proyectil mágico',
    type: 'wizard',
    level: 1,
  },
  rayOfSickness: {
    name: 'rayOfSickness',
    translation: 'Rayo de dolencia',
    type: 'wizard',
    level: 1,
  },
  expeditiousRetreat: {
    name: 'expeditiousRetreat',
    translation: 'Retirada expeditiva',
    type: 'wizard',
    level: 1,
  },
  colorSpray: {
    name: 'colorSpray',
    translation: 'Rociada de color',
    type: 'wizard',
    level: 1,
  },
  jump: {
    name: 'jump',
    translation: 'Salto',
    type: 'wizard',
    level: 1,
  },
  unseenServant: {
    name: 'unseenServant',
    translation: 'Sirviente invisible',
    type: 'wizard',
    level: 1,
  },
  tashasHideousLaughter: {
    name: 'tashasHideousLaughter',
    translation: 'Terribles carcajadas de Tasha',
    type: 'wizard',
    level: 1,
  },
  falseLife: {
    name: 'falseLife',
    translation: 'Vida falsa',
    type: 'wizard',
    level: 1,
  },
  witchBolt: {
    name: 'witchBolt',
    translation: 'Virote encantado',
    type: 'wizard',
    level: 1,
  },
  longstrider: {
    name: 'longstrider',
    translation: 'Zancada prodigiosa',
    type: 'wizard',
    level: 1,
  },
};

function wizardSpellSlots(pc) {
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

export function getWizardCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    3, 3, 3,
    4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  ][level - 1];
}

export function getWizardSpellSlots(pc) {
  return [getWizardCantripsNumber(pc), ...wizardSpellSlots(pc)];
}

export function getWizardTotalSpells(pc) {
  const { level } = pc;

  return 6 + (level - 1) * 2;
}

export function getWizardMaxPreparedSpells(pc) {
  const { level } = pc;

  const totalSpells = getStatMod(getStat(pc, 'int')) + level;
  return totalSpells > 1 ? totalSpells : 1;
}
