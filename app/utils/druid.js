import { ARMORS } from './equipment/armors';
import { EXPLORERS_PACK } from './equipment/packs';
import { getAllDruidicFocus } from './equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from './equipment/weapons';

export const DRUID_EQUIPMENT = [
  { or: [ARMORS.shield(), ...getAllSimpleMelee(), ...getAllSimpleRanged()] },
  {
    or: [WEAPONS.scimitar(), ...getAllSimpleMelee()],
  },
  ARMORS.leather(),
  EXPLORERS_PACK,
  { or: getAllDruidicFocus() },
];

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
