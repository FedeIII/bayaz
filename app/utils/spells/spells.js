import {
  CLASSES,
  getProficiencyBonus,
  getStat,
  getStatMod,
  RACES,
} from '../characters';
import { BARD_SPELLS, getBardCantrips, getBardTotalSpells } from './bard';
import { SORCERER_SPELLS } from './sorcerer';
import { WIZARD_SPELLS } from './wizard';

export const ALL_SPELLS = [
  ...Object.values(WIZARD_SPELLS),
  ...Object.values(BARD_SPELLS),
  ...Object.values(SORCERER_SPELLS),
];

export function getSpell(spellName, spellType) {
  return (
    ALL_SPELLS.find(
      spell => spell.name === spellName && spell.type === spellType
    ) || {}
  );
}

function getCantrips(pc) {
  const { pClass, level } = pc;

  return {
    bard: getBardCantrips,
  }[pClass](level);
}

export function getTotalSpells(pc) {
  const { pClass, level } = pc;

  return {
    bard: getBardTotalSpells,
  }[pClass](level);
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

const spellSlots = lvl =>
  [
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
  ][lvl - 1];

export function getSpellSlots(pc) {
  const { level } = pc;

  return [getCantrips(pc), ...spellSlots(level)];
}
