import {
  CLASSES,
  getDamageBonus,
  getProficiencyBonus,
  getStat,
  getStatMod,
} from '~/domain/characters';
import { ARMORS } from '../../equipment/armors';
import { DUNGEONEERS_PACK, EXPLORERS_PACK } from '../../equipment/packs';
import { TOOLS } from '../../equipment/tools';
import {
  getAllMartialMelee,
  isRangedWeapon,
  WEAPONS,
} from '../../equipment/weapons';
import { displayTrait } from '~/domain/display';
import { getItem } from '~/domain/equipment/equipment';

export const FIGHTING_STYLES = [
  'archery',
  'defense',
  'dueling',
  'great-Weapon-fighting',
  'protection',
  'two-weapon-fighting',
];

export function translateFightingStyle(fightingStyle) {
  switch (fightingStyle) {
    case 'archery':
      return 'A distancia';
    case 'defense':
      return 'Defensa';
    case 'dueling':
      return 'Duelista';
    case 'great-Weapon-fighting':
      return 'Lucha con Arma a dos Manos';
    case 'protection':
      return 'Protección';
    case 'two-weapon-fighting':
      return 'Lucha con Dos Armas';

    default:
      return 'unknown fighting style';
  }
}

export function getFightingStyle(pc) {
  return pc.classAttrs?.fighter?.fightingStyle || null;
}

export function getExtraFightingStyle(pc) {
  return pc.classAttrs?.fighter?.extraFightingStyle || null;
}

export function getAllFightingStyles(pc) {
  return [getFightingStyle(pc), getExtraFightingStyle(pc)].filter(s => s);
}

export const FIGHTER_EQUIPMENT = [
  {
    or: [
      ARMORS().chainMail(),
      {
        and: [
          ARMORS().leather(),
          WEAPONS().longbow(),
          TOOLS().arrows({ amount: 20 }),
        ],
      },
    ],
  },
  {
    or: [
      ...getAllMartialMelee().map(weapon => [weapon, ARMORS().shield()]),
      ...getAllMartialMelee({ amount: 2 }),
    ],
  },
  {
    or: [
      {
        and: [WEAPONS().lightCrossbow(), TOOLS().crossbowBolts({ amount: 20 })],
      },
      WEAPONS().handaxe({ amount: 2 }),
    ],
  },
  { or: [DUNGEONEERS_PACK, EXPLORERS_PACK] },
];

export const MARTIAL_ARCHETYPES = [
  'eldritchKnight',
  'champion',
  'battleMaster',
];

export function translateMartialArchetype(archetype) {
  switch (archetype) {
    case 'eldritchKnight':
      return 'Caballero Arcano';
    case 'champion':
      return 'Campeón';
    case 'battleMaster':
      return 'Maestro de Batalla';

    default:
      return 'unknown martial archetype';
  }
}

export function getMartialArchetype(pc) {
  return pc.classAttrs?.fighter?.martialArchetype;
}

export function isEldritchknight(pc) {
  return getMartialArchetype(pc) === 'eldritchKnight';
}

export function isChampion(pc) {
  return getMartialArchetype(pc) === 'champion';
}

export function isBattleMaster(pc) {
  return getMartialArchetype(pc) === 'battleMaster';
}

export function getMartialArchetypeTraits(pc) {
  const { level } = pc;
  const martialArchetype = getMartialArchetype(pc);

  return Object.entries(
    Object.entries(CLASSES.fighter.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.martialArchetype?.[martialArchetype]?.traits || {}
          : {}),
      }),
      {}
    )
  ).filter(t => !!displayTrait(t[0], t[1], pc));
}

export function getKnightSpells(pc) {
  return pc.classAttrs?.fighter?.knightSpells || [];
}

export const COMBAT_SUPERIORITY_MANEUVERS = [
  'commandersStrike',
  'disarmingAttack',
  'distractingStrike',
  'evasiveFootwork',
  'feintingAttack',
  'goadingAttack',
  'lungingAttack',
  'maneuveringAttack',
  'menacingAttack',
  'parry',
  'precisionAttack',
  'pushingAttack',
  'rally',
  'riposte',
  'sweepingAttack',
  'tripAttack',
];

export function translateCombatSuperiorityManeuvers(maneuver) {
  switch (maneuver) {
    case 'rally':
      return 'Alentar';
    case 'menacingAttack':
      return 'Ataque Amenazante';
    case 'lungingAttack':
      return 'Ataque de Arremetida';
    case 'sweepingAttack':
      return 'Ataque de Barrido';
    case 'tripAttack':
      return 'Ataque de Derribo';
    case 'disarmingAttack':
      return 'Ataque de Desarme';
    case 'pushingAttack':
      return 'Ataque de Empujón';
    case 'precisionAttack':
      return 'Ataque de Precisión';
    case 'goadingAttack':
      return 'Ataque de Provocación';
    case 'feintingAttack':
      return 'Ataque en Finta';
    case 'maneuveringAttack':
      return 'Ataque Táctico';
    case 'riposte':
      return 'Contraataque';
    case 'distractingStrike':
      return 'Golpe de Distracción';
    case 'evasiveFootwork':
      return 'Juego de Piernas Evasivo';
    case 'commandersStrike':
      return 'Ordenar Ataque';
    case 'parry':
      return 'Parada';

    default:
      return 'unknown combat superiority maneuver';
  }
}

export function getCombatSuperiorityManeuvers(pc) {
  return pc.classAttrs?.fighter?.combatSuperiority || [];
}

export function hasToLearnCombatSuperiorityManeuvers(pc) {
  const { level } = pc;

  const maneuvers = getCombatSuperiorityManeuvers(pc);

  return (
    (level >= 15 && maneuvers.length < 9) ||
    (level >= 10 && maneuvers.length < 7) ||
    (level >= 7 && maneuvers.length < 5) ||
    maneuvers.length < 3
  );
}

export function getMaxCombatSuperiorityManeuvers(pc) {
  const { level } = pc;

  return level >= 15 ? 9 : level >= 10 ? 7 : level >= 7 ? 5 : 3;
}

export function getManeuverDc(pc) {
  return (
    8 +
    getProficiencyBonus(pc.level) +
    Math.max(getStatMod(getStat(pc, 'str')), getStatMod(getStat(pc, 'dex')))
  );
}

export function getCombatSuperiorityDiceAmount(pc) {
  const { level } = pc;

  return level >= 15 ? 6 : level >= 7 ? 5 : 4;
}

export function getCombatSuperiorityDiceFaces(pc) {
  const { level } = pc;

  return level >= 18 ? 12 : level >= 10 ? 10 : 8;
}

export function getCombatSuperiorityDice(pc) {
  return (
    getCombatSuperiorityDiceAmount(pc) + 'd' + getCombatSuperiorityDiceFaces(pc)
  );
}

export function getStudentOfWar(pc) {
  return pc.classAttrs?.fighter?.studentOfWar || null;
}

export function getAttackBonusForFightingStyles(pc, weapon, weaponIndex) {
  const fightingStyles = getAllFightingStyles(pc);

  if (fightingStyles.includes('archery') && isRangedWeapon(weapon)) {
    return 2;
  }
  return 0;
}
