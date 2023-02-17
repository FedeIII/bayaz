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
  getClericSpellSlots,
  getClericTotalSpells,
} from '../cleric';
import {
  getWarlockCantripsNumber,
  getWarlockSpellSlots,
  getWarlockTotalSpells,
  WARLOCK_SPELLS,
} from '../warlock';
import {
  BARD_SPELLS,
  getBardCantripsNumber,
  getBardSpellSlots,
  getBardTotalSpells,
} from './bard';
import { SORCERER_SPELLS } from './sorcerer';
import { WIZARD_SPELLS } from './wizard';

export const ALL_SPELLS = [
  ...Object.values(BARD_SPELLS),
  ...Object.values(WARLOCK_SPELLS),
  ...Object.values(CLERIC_SPELLS),
  ...Object.values(WIZARD_SPELLS),
  ...Object.values(SORCERER_SPELLS),
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

  return {
    bard: getBardCantripsNumber,
    warlock: getWarlockCantripsNumber,
    cleric: getClericCantripsNumber,
  }[pClass](pc);
}

export function getTotalSpells(pc) {
  const { pClass } = pc;

  return {
    bard: getBardTotalSpells,
    warlock: getWarlockTotalSpells,
    cleric: getClericTotalSpells,
  }[pClass](pc);
}

export function getSpellSlots(pc) {
  const { pClass } = pc;

  return {
    bard: getBardSpellSlots,
    warlock: getWarlockSpellSlots,
    cleric: getClericSpellSlots,
  }[pClass](pc);
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
