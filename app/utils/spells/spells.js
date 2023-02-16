import {
  CLASSES,
  getProficiencyBonus,
  getStat,
  getStatMod,
  RACES,
} from '../characters';
import { WIZARD_SPELLS } from './wizard';

export const ALL_SPELLS = [...Object.values(WIZARD_SPELLS)];

export function getSpell(spellName) {
  return ALL_SPELLS.find(spell => spell.name === spellName) || {};
}

export function getSpellcastingAbility(pc) {
  const { pClass, race, subrace } = pc;

  return (
    CLASSES[pClass].spellcastingAbility ||
    RACES[race][subrace].spellcastingAbility ||
    '-'
  );
}

export function getSpellAttackBonus(pc) {
  const { level } = pc;

  return (
    getProficiencyBonus(level) +
    getStatMod(getStat(pc, getSpellcastingAbility(pc)))
  );
}

export function getSpellSavingThrow(pc) {
  return 8 + getSpellAttackBonus(pc);
}

export function divideSpells(pc) {
  const { spells } = pc;

  return spells.reduce((spellsByLevel, spellName) => {
    const spell = getSpell(spellName);
    spellsByLevel[spell.level].push(spell);
    return spellsByLevel;
  }, Array(9).fill([]));
}

export function isPreparedSpell(pc, spellName) {
  const { preparedSpells } = pc;

  return preparedSpells.includes(spellName);
}
