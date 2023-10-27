import { DIPLOMATS_PACK, ENTERTAINERS_PACK } from '../../equipment/packs';
import { ARMORS, getAllMediumArmors } from '../../equipment/armors';
import { getAllMusicalInstruments } from '../../equipment/tools';
import {
  getAllMartialMelee,
  getAllMartialRanged,
  getAllSimpleMelee,
  WEAPONS,
} from '../../equipment/weapons';
import {
  CLASSES,
} from '../../characters';


export const BARD_EQUIPMENT = [
  { or: [WEAPONS().rapier(), WEAPONS().longsword(), ...getAllSimpleMelee()] },
  { or: [DIPLOMATS_PACK, ENTERTAINERS_PACK] },
  { or: getAllMusicalInstruments() },
  ARMORS().leather(),
  WEAPONS().dagger(),
];

export function getBardCollege(pc) {
  return pc.classAttrs?.bard?.bardCollege;
}

export function getLoreCollegeProficiencies(pc) {
  return pc.classAttrs?.bard?.loreCollegeProficiencies || [];
}

export function getAllLoreSpellsLearned(pc) {
  return pc.classAttrs?.bard?.loreSpells || [];
}

export function getLoreSpells(pc) {
  return getAllLoreSpellsLearned(pc).filter(s => !s.forgotten) || [];
}

export function getForgottenLoreSpells(pc) {
  return getAllLoreSpellsLearned(pc).filter(s => s.forgotten) || [];
}

export function getAllMagicalSecretsSpellsLearned(pc) {
  return pc.classAttrs?.bard?.magicalSecretsSpells || [];
}

export function getMagicalSecretsSpells(pc) {
  return getAllMagicalSecretsSpellsLearned(pc).filter(s => !s.forgotten) || [];
}

export function getForgottenMagicalSecretsSpells(pc) {
  return getAllMagicalSecretsSpellsLearned(pc).filter(s => s.forgotten) || [];
}

export const BARD_COLLEGES = {
  lore: {
    pickSkills: 3,
  },
  valor: {
    proficientItems: [
      ...getAllMediumArmors().map(i => i.name),
      'shield',
      ...getAllMartialMelee().map(i => i.name),
      ...getAllMartialRanged().map(i => i.name),
    ],
  },
};

export function getBardCollegeTraits(pc) {
  const { level } = pc;

  const bardCollege = getBardCollege(pc);

  return Object.entries(
    Object.entries(CLASSES.bard.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.bardCollege?.[bardCollege]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}

export function translateBardCollege(bardCollege) {
  if (bardCollege === 'lore') return 'Conocimiento';
  if (bardCollege === 'valor') return 'Valor';
  return 'unknown bard college';
}

export function maxMagicalSecretsSpells(pc) {
  const { level } = pc;

  if (level >= 18) return 6;
  if (level >= 14) return 4;
  if (level >= 10) return 2;
  return 0;
}

export function hasToLearnMagicalSecretsSpells(pc) {
  const magicalSecretsSpells = getAllMagicalSecretsSpellsLearned(pc);

  return maxMagicalSecretsSpells(pc) > magicalSecretsSpells.length;
}
