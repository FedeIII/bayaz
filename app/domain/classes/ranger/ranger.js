import { CLASSES } from '~/domain/characters';
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

export function getFavoredEnemiesSelected(pc) {
  return pc.classAttrs?.ranger?.favoredEnemiesSelection?.length || 0;
}

export function hasToPickFavoredEnemies(pc) {
  const { level } = pc;

  const favoredEnemiesselected = getFavoredEnemiesSelected(pc);

  return (
    (level >= 14 && favoredEnemiesselected < 3) ||
    (level >= 6 && favoredEnemiesselected < 2)
  );
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

export function hasToPickFavoredTerrain(pc) {
  const { level } = pc;

  const favoredTerrainsAmount = getFavoredTerrains(pc).length;

  return (
    (level >= 10 && favoredTerrainsAmount < 3) ||
    (level >= 6 && favoredTerrainsAmount < 2)
  );
}

export const RANGER_CONCLAVES = ['hunter', 'beastMaster'];

export function translateRangerConclave(archetype) {
  switch (archetype) {
    case 'hunter':
      return 'Cazador';
    case 'beastMaster':
      return 'Señor de las Bestias';
    default:
      return 'unknown ranger conclave';
  }
}

export function getRangerConclave(pc) {
  return pc.classAttrs?.ranger?.rangerConclave || null;
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

export function getRangerConclaveTraits(pc) {
  const { level } = pc;
  const rangerConclave = getRangerConclave(pc);

  return Object.entries(
    Object.entries(CLASSES.ranger.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.rangerConclave?.[rangerConclave]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}

export const HUNTERS_PREY = ['colossusSlayer', 'giantKiller', 'hordeBreaker'];

export function getHuntersPrey(pc) {
  return pc.classAttrs?.ranger?.huntersPrey || null;
}

export function translateHuntersPrey(prey) {
  if (prey === 'colossusSlayer') return 'Asesino Colosal';
  if (prey === 'giantKiller') return 'Asesino de Gigantes';
  if (prey === 'hordeBreaker') return 'Rompe Hordas';
  return 'unknown hunters prey';
}

export const HUNTER_DEFENSIVE_TACTICS = [
  'escapeTheHorde',
  'multiattackDefense',
  'steelWill',
];

export function getHunterDefensiveTactics(pc) {
  return pc.classAttrs?.ranger?.defensiveTactics || null;
}

export function translateHuntersDefensiveTactics(tactic) {
  if (tactic === 'escapeTheHorde') return 'Escapar de la Horda';
  if (tactic === 'multiattackDefense')
    return 'Defensa Contra Ataques Múltiples';
  if (tactic === 'steelWill') return 'Voluntad de Acero';
  return 'unknown hunter defensive tactics';
}

export const HUNTER_MULTIATTACK = ['volley', 'whirlwindAttack'];

export function getHunterMultiattack(pc) {
  return pc.classAttrs?.ranger?.multiattack || null;
}

export function translateHunterMultiattack(multiattack) {
  if (multiattack === 'volley') return 'Torrente';
  if (multiattack === 'whirlwindAttack') return 'Ataque de Torbellino';
  return 'unknown hunter multiattack';
}
