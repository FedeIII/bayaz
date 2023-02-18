import {
  CLASSES,
  getProficiencyBonus,
  getStat,
  getStatMod,
  RACES,
} from '../characters';
import {
  CLERIC_SPELLS,
  getClericCantripsNumber,
  getClericExtraPreparedSpells,
  getClericMaxPreparedSpells,
  getClericSpellSlots,
} from './cleric';
import {
  DRUID_SPELLS,
  getDruidCantripsNumber,
  getDruidSpellSlots,
  getDruidTotalSpells,
} from './druid';
import {
  getWarlockCantripsNumber,
  getWarlockSpellSlots,
  getWarlockTotalSpells,
  WARLOCK_SPELLS,
} from './warlock';
import {
  BARD_SPELLS,
  getBardCantripsNumber,
  getBardSpellSlots,
  getBardTotalSpells,
} from './bard';
import {
  getSorcererCantripsNumber,
  getSorcererSpellSlots,
  getSorcererTotalSpells,
  SORCERER_SPELLS,
} from './sorcerer';
import {
  getWizardCantripsNumber,
  getWizardMaxPreparedSpells,
  getWizardSpellSlots,
  getWizardTotalSpells,
  WIZARD_SPELLS,
} from './wizard';

export const ALL_SPELLS = [
  ...Object.values(BARD_SPELLS),
  ...Object.values(WARLOCK_SPELLS),
  ...Object.values(CLERIC_SPELLS),
  ...Object.values(DRUID_SPELLS),
  ...Object.values(SORCERER_SPELLS),
  ...Object.values(WIZARD_SPELLS),
];

export function getSpell(spellName, spellType) {
  return (
    ALL_SPELLS.find(
      spell => spell.name === spellName && spell.type === spellType
    ) || {}
  );
}

export function getCantripsNumber(pc) {
  const { pClass } = pc;

  const getClassCantripsNumber = {
    bard: getBardCantripsNumber,
    warlock: getWarlockCantripsNumber,
    cleric: getClericCantripsNumber,
    druid: getDruidCantripsNumber,
    sorcerer: getSorcererCantripsNumber,
    wizard: getWizardCantripsNumber,
  }[pClass];

  if (getClassCantripsNumber) return getClassCantripsNumber(pc);
  else return 0;
}

export function getTotalSpells(pc) {
  const { pClass } = pc;

  const getClassTotalSpells = {
    bard: getBardTotalSpells,
    warlock: getWarlockTotalSpells,
    druid: getDruidTotalSpells,
    sorcerer: getSorcererTotalSpells,
    wizard: getWizardTotalSpells,
  }[pClass];

  if (getClassTotalSpells) return getClassTotalSpells(pc);
  else return 0;
}

export function getSpellSlots(pc) {
  const { pClass } = pc;

  const getClassSpellSlots = {
    bard: getBardSpellSlots,
    warlock: getWarlockSpellSlots,
    cleric: getClericSpellSlots,
    druid: getDruidSpellSlots,
    sorcerer: getSorcererSpellSlots,
    wizard: getWizardSpellSlots,
  }[pClass];

  if (getClassSpellSlots) return getClassSpellSlots(pc);
  else return [];
}

export function getMaxPreparedSpells(pc) {
  const { pClass } = pc;

  const getClassMaxPreparedSpells = {
    cleric: getClericMaxPreparedSpells,
    wizard: getWizardMaxPreparedSpells,
  }[pClass];

  if (getClassMaxPreparedSpells) return getClassMaxPreparedSpells(pc);
  else return null;
}

export function getExtraPreparedSpells(pc) {
  const { pClass } = pc;

  const getClassExtraPreparedSpells = {
    cleric: getClericExtraPreparedSpells,
  }[pClass];

  if (getClassExtraPreparedSpells) return getClassExtraPreparedSpells(pc);
  else return [];
}

export function hasToPrepareSpells(pc) {
  const { pClass } = pc;

  return ['cleric', 'druid', 'wizard'].includes(pClass);
}

export function doesNotHaveToPrepareSpells(pc) {
  const { pClass } = pc;

  return ['bard', 'warlock', 'sorcerer'].includes(pClass);
}

export function getSpellcastingAbility(pc, spellType) {
  const { pClass, race, subrace } = pc;
  const casterType = spellType || pClass;

  return (
    CLASSES[casterType].spellcastingAbility ||
    RACES[race][subrace].spellcastingAbility ||
    '-'
  );
}

export function getSpellAttackBonus(pc, spellType) {
  const { level, pClass } = pc;
  if (!spellType) spellType = pClass;

  return (
    getProficiencyBonus(level) +
    getStatMod(getStat(pc, getSpellcastingAbility(pc, spellType)))
  );
}

export function getSpellSavingThrow(pc, spellType) {
  return 8 + getSpellAttackBonus(pc, spellType);
}

export function divideSpells(pc) {
  const { spells } = pc;

  return spells.reduce((spellsByLevel, pSpell) => {
    const spell = getSpell(pSpell.name, pSpell.type);
    spellsByLevel[spell.level] = [...spellsByLevel[spell.level], spell];
    return spellsByLevel;
  }, Array(9).fill([]));
}

export function isPreparedSpell(pc, spellName) {
  const { preparedSpells } = pc;

  return !!preparedSpells.find(spell => spell.name === spellName);
}
