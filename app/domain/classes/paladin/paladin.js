import { CLASSES, getStat, getStatMod } from '~/domain/characters';
import { ARMORS } from '~/domain/equipment/armors';
import { EXPLORERS_PACK, PRIESTS_PACK } from '~/domain/equipment/packs';
import { TOOLS } from '~/domain/equipment/tools';
import {
  getAllMartialMelee,
  getAllSimpleMelee,
  WEAPONS,
} from '~/domain/equipment/weapons';

export const PALADIN_EQUIPMENT = [
  {
    or: [
      ...getAllMartialMelee().map(weapon => [weapon, ARMORS().shield()]),
      ...getAllMartialMelee({ amount: 2 }),
    ],
  },
  { or: [WEAPONS().javelin({ amount: 5 }), ...getAllSimpleMelee()] },
  { or: [PRIESTS_PACK, EXPLORERS_PACK] },
  ARMORS().chainMail(),
  TOOLS().holySymbol(),
];

export const PALADIN_FIGHTING_STYLES = [
  'defense',
  'dueling',
  'great-Weapon-fighting',
  'protection',
];

export function getPaladinFightingStyle(pc) {
  return pc.classAttrs?.paladin?.fightingStyle || null;
}

export const SACRED_OATHS = ['Devotion', 'Ancients', 'Vengeance'];

export function translateSacredOath(oath) {
  if (oath === 'Devotion') return 'Juramento de Devoción';
  if (oath === 'Ancients') return 'Juramento de los Ancestros';
  if (oath === 'Vengeance') return 'Juramento de Venganza';

  return 'unknown oath';
}

export function getSacredOath(pc) {
  return pc.classAttrs?.paladin?.sacredOath || null;
}

export function getSacredOathTraits(pc) {
  const { level } = pc;
  const sacredOath = getSacredOath(pc);

  return Object.entries(
    Object.entries(CLASSES().paladin.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? {
              ...(levelSkills.sacredOath?.all?.traits || {}),
              ...(levelSkills.sacredOath?.[sacredOath]?.traits || {}),
            }
          : {}),
      }),
      {}
    )
  ).filter(t => !!displayTrait(t[0], t[1], pc));
}

export function getLayOnHands(pc) {
  return pc.classAttrs?.paladin?.layOnHands || 0;
}

export function getMaxLayOnHands(pc) {
  return pc.level * 5;
}

export function getDivineSense(pc) {
  return pc.classAttrs?.paladin?.divineSense || 0;
}

export function getMaxDivineSense(pc) {
  return 1 + getStatMod(getStat(pc, 'cha'));
}
