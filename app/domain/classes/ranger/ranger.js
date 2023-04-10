import { ARMORS } from '../../equipment/armors';
import { DUNGEONEERS_PACK, EXPLORERS_PACK } from '../../equipment/packs';
import { TOOLS } from '../../equipment/tools';
import { getAllSimpleMelee, WEAPONS } from '../../equipment/weapons';

export const FAVORED_ENEMIES = [
  'aberrations',
  'beasts',
  'celestials',
  'constructs',
  'dragons',
  'elementals',
  'fey',
  'fiends',
  'devils',
  'giants',
  'monstrosities',
  'oozes',
  'plants',
  'undead',
];

export const FAVORED_ENEMIES_HUMANOIDS = [
  'dwarfs',
  'elfs',
  'halflings',
  'humans',
  'orcs',
  'goblins',
  'gnomes',
];

export const FAVORED_ENEMIES_LANGUAGES = {
  dwarfs: 'dwarvish',
  elfs: 'elvish',
  halflings: 'halfling',
  humans: 'common',
  orcs: 'orc',
  giants: 'giant',
  goblins: 'goblin',
  gnomes: 'gnomish',
  fiends: 'abyssal',
  celestials: 'celestial',
  dragons: 'draconic',
  aberrations: 'deep-speech',
  devils: 'infernal',
  elementals: 'primordial',
  fey: 'sylvan',
};

export function translateFavoredEnemy(enemy) {
  switch (enemy) {
    case 'aberrations':
      return 'Aberraciones';
    case 'beasts':
      return 'Bestias';
    case 'celestials':
      return 'Celestiales';
    case 'constructs':
      return 'Constructos';
    case 'dragons':
      return 'Dragones';
    case 'elementals':
      return 'Elementales';
    case 'fey':
      return 'Feéricos';
    case 'fiends':
      return 'Infernales';
    case 'devils':
      return 'Diablos';
    case 'giants':
      return 'Gigantes';
    case 'monstrosities':
      return 'Monstruos';
    case 'oozes':
      return 'Cienos';
    case 'plants':
      return 'Plantas';
    case 'undead':
      return 'No-muertos';
    case 'dwarfs':
      return 'Enanos';
    case 'elfs':
      return 'Elfos';
    case 'halflings':
      return 'Medianos';
    case 'humans':
      return 'Humanos';
    case 'orcs':
      return 'Orcos';
    case 'goblins':
      return 'Goblins';
    case 'gnomes':
      return 'Gnomos';
    default:
      return 'unknown favored enemy';
  }
}

export function getFavoredEnemies(pc) {
  return pc.classAttrs?.ranger?.favoredEnemies || [];
}

export const FAVORED_TERRAINS = [
  'arctic',
  'coast',
  'desert',
  'forest',
  'grassland',
  'mountain',
  'swamp',
  'underdark',
];

export function translateFavoredTerrain(terrain) {
  switch (terrain) {
    case 'arctic':
      return 'Ártico';
    case 'coast':
      return 'Costa';
    case 'desert':
      return 'Desierto';
    case 'forest':
      return 'Bosques';
    case 'grassland':
      return 'Pradera';
    case 'mountain':
      return 'Montaña';
    case 'swamp':
      return 'Pantano';
    case 'underdark':
      return 'Infraoscuridad';
  }
}

export function getFavoredTerrains(pc) {
  return pc.classAttrs?.ranger?.favoredTerrains || [];
}

export const RANGER_ARCHETYPES = ['hunter', 'beast-master'];

export function translateRangerArchetype(archetype) {
  switch (archetype) {
    case 'hunter':
      return 'Cazador';
    case 'beast-master':
      return 'Señor de las Bestias';
    default:
      return 'unknown ranger archetype';
  }
}

export function getRangerArchetype(pc) {
  return pc.classAttrs?.ranger?.rangerArchetype || null;
}

export const RANGER_EQUIPMENT = [
  { or: [ARMORS.scaleMail(), ARMORS.leather()] },
  {
    or: [
      WEAPONS.shortsword({ amount: 2 }),
      ...getAllSimpleMelee({ amount: 2 }),
    ],
  },
  { or: [DUNGEONEERS_PACK, EXPLORERS_PACK] },
  { and: [WEAPONS.longbow(), TOOLS.arrows({ amount: 20 })] },
];

export const RANGER_FIGHTING_STYLES = [
  'archery',
  'defense',
  'dueling',
  'twoWeaponFighting',
];

export function translateRangerFightingStyle(style) {
  switch (style) {
    case 'archery':
      return 'A Distancia';
    case 'defense':
      return 'Defensa';
    case 'dueling':
      return 'Duelista';
    case 'twoWeaponFighting':
      return 'Lucha con Dos Armas';

    default:
      return 'unknown fighting style';
  }
}

export function getRangerFightingStyle(pc) {
  return pc.classAttrs?.ranger?.fightingStyle || null;
}
