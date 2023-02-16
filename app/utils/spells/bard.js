export const BARD_SPELLS = {
  // LEVEL 0 //
  friends: {
    name: 'friends',
    translation: 'Amigos',
    type: 'bard',
    level: 0,
  },
  viciousMockery: {
    name: 'viciousMockery',
    translation: 'Burla cruel',
    type: 'bard',
    level: 0,
  },
  bladeWard: {
    name: 'bladeWard',
    translation: 'Cuchilla protectora',
    type: 'bard',
    level: 0,
  },
  trueStrike: {
    name: 'trueStrike',
    translation: 'Impacto verdadero',
    type: 'bard',
    level: 0,
  },
  minorIllusion: {
    name: 'minorIllusion',
    translation: 'Ilusión menor',
    type: 'bard',
    level: 0,
  },
  dancingLights: {
    name: 'dancingLights',
    translation: 'Luces danzantes',
    type: 'bard',
    level: 0,
  },
  light: {
    name: 'light',
    translation: 'Luz',
    type: 'bard',
    level: 0,
  },
  mageHand: {
    name: 'mageHand',
    translation: 'Mano de mago',
    type: 'bard',
    level: 0,
  },
  message: {
    name: 'message',
    translation: 'Mensaje',
    type: 'bard',
    level: 0,
  },
  prestidigitation: {
    name: 'prestidigitation',
    translation: 'Prestidigitación',
    type: 'bard',
    level: 0,
  },
  mending: {
    name: 'mending',
    translation: 'Remendar',
    type: 'bard',
    level: 0,
  },

  // LEVEL 1 //
  animalFriendship: {
    name: 'animalFriendship',
    translation: 'Amistad con los animales',
    type: 'bard',
    level: 1,
  },
  featherFall: {
    name: 'featherFall',
    translation: 'Caída de pluma',
    type: 'bard',
    level: 1,
  },
  comprehendLanguages: {
    name: 'comprehendLanguages',
    translation: 'Comprensión idiomática',
    type: 'bard',
    level: 1,
  },
  cureWounds: {
    name: 'cureWounds',
    translation: 'Curar heridas',
    type: 'bard',
    level: 1,
  },
  detectMagic: {
    name: 'detectMagic',
    translation: 'Detectar magia',
    type: 'bard',
    level: 1,
  },
  disguiseSelf: {
    name: 'disguiseSelf',
    translation: 'Disfrazarse',
    type: 'bard',
    level: 1,
  },
  sleep: {
    name: 'sleep',
    translation: 'Dormir',
    type: 'bard',
    level: 1,
  },
  illusoryScript: {
    name: 'illusoryScript',
    translation: 'Escritura ilusoria',
    type: 'bard',
    level: 1,
  },
  faerieFire: {
    name: 'faerieFire',
    translation: 'Fuego feérico',
    type: 'bard',
    level: 1,
  },
  speakWithAnimals: {
    name: 'speakWithAnimals',
    translation: 'Hablar con los animales',
    type: 'bard',
    level: 1,
  },
  charmPerson: {
    name: 'charmPerson',
    translation: 'Hechizar persona',
    type: 'bard',
    level: 1,
  },
  heroism: {
    name: 'heroism',
    translation: 'Heroísmo',
    type: 'bard',
    level: 1,
  },
  identify: {
    name: 'identify',
    translation: 'Identificar',
    type: 'bard',
    level: 1,
  },
  silentImage: {
    name: 'silentImage',
    translation: 'Imagen silenciosa',
    type: 'bard',
    level: 1,
  },
  thunderwave: {
    name: 'thunderwave',
    translation: 'Onda atronadora',
    type: 'bard',
    level: 1,
  },
  healingWord: {
    name: 'healingWord',
    translation: 'Palabra sanadora',
    type: 'bard',
    level: 1,
  },
  bane: {
    name: 'bane',
    translation: 'Perdición',
    type: 'bard',
    level: 1,
  },
  unseenServant: {
    name: 'unseenServant',
    translation: 'Sirviente invisible',
    type: 'bard',
    level: 1,
  },
  dissonantWhispers: {
    name: 'dissonantWhispers',
    translation: 'Susurros disonantes',
    type: 'bard',
    level: 1,
  },
  tashasHideousLaughter: {
    name: 'tashasHideousLaughter',
    translation: 'Terribles carcajadas de Tasha',
    type: 'bard',
    level: 1,
  },
  longstrider: {
    name: 'longstrider',
    translation: 'Zancada prodigiosa',
    type: 'bard',
    level: 1,
  },
};

export function getBardCantrips(level) {
  /* prettier-ignore */
  return [
    2,2,2,
    3,3,3,3,3,3,
    4,4,4,4,4,4,4,4,4,4,4
  ][level - 1];
}

export function getBardTotalSpells(level) {
  /* prettier-ignore */
  return [
    4,5,6,7,8,9,10,11,12,
    14,15,15,
    16,18,19,19,
    20,22,22,22
  ][level - 1]
}
