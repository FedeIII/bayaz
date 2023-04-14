import { getKnightSpells, isEldritchknight } from '../classes/fighter/fighter';
import { getKnownCantrips, getKnownSpells } from './getSpells';
import { SPELL_LIST } from './spellList';

export const FIGHTER_SPELLS = SPELL_LIST.filter(
  spell =>
    spell.class.includes('wizard') &&
    (spell.level === 0 || ['Abjuration', 'Evocation'].includes(spell.school))
);

function fighterSpellSlots(pc) {
  const { level } = pc;

  if (!isEldritchknight(pc)) return [];

  return [
    /*  1 */ [],
    /*  2 */ [],
    /*  3 */ [2],
    /*  4 */ [3],
    /*  5 */ [3],
    /*  6 */ [3],
    /*  7 */ [4, 2],
    /*  8 */ [4, 2],
    /*  9 */ [4, 2],
    /* 10 */ [4, 3],
    /* 11 */ [4, 3],
    /* 12 */ [4, 3],
    /* 13 */ [4, 3, 2],
    /* 14 */ [4, 3, 2],
    /* 15 */ [4, 3, 2],
    /* 16 */ [4, 3, 3],
    /* 17 */ [4, 3, 3],
    /* 18 */ [4, 3, 3],
    /* 19 */ [4, 3, 3, 1],
    /* 20 */ [4, 3, 3, 1],
  ][level - 1];
}

export function getFighterSpellSlots(pc) {
  return [getFighterCantripsNumber(pc), ...fighterSpellSlots(pc)];
}

export function getFighterCantripsNumber(pc) {
  const { level } = pc;

  if (!isEldritchknight(pc)) return [];

  /* prettier-ignore */
  return [
    /*  1 */ 0,
    /*  2 */ 0,
    /*  3 */ 2,
    /*  4 */ 2,
    /*  5 */ 2,
    /*  6 */ 2,
    /*  7 */ 2,
    /*  8 */ 2,
    /*  9 */ 2,
    /* 10 */ 3,
    /* 11 */ 3,
    /* 12 */ 3,
    /* 13 */ 3,
    /* 14 */ 3,
    /* 15 */ 3,
    /* 16 */ 3,
    /* 17 */ 3,
    /* 18 */ 3,
    /* 19 */ 3,
    /* 20 */ 3,
  ][level - 1];
}

export function getFighterTotalSpells(pc) {
  const { level } = pc;

  if (!isEldritchknight(pc)) return [];

  /* prettier-ignore */
  return [
    /*  1 */ 0,
    /*  2 */ 0,
    /*  3 */ 2,
    /*  4 */ 3,
    /*  5 */ 3,
    /*  6 */ 3,
    /*  7 */ 4,
    /*  8 */ 4,
    /*  9 */ 4,
    /* 10 */ 5,
    /* 11 */ 6,
    /* 12 */ 6,
    /* 13 */ 7,
    /* 14 */ 7,
    /* 15 */ 7,
    /* 16 */ 8,
    /* 17 */ 8,
    /* 18 */ 8,
    /* 19 */ 9,
    /* 20 */ 9,
  ][level - 1]
}

export function hasNewFighterCantrips(pc) {
  if (!isEldritchknight(pc)) return false;

  const knownCantripsNumber = getFighterCantripsNumber(pc);
  if (knownCantripsNumber > getKnownCantrips(pc).length) return true;

  return false;
}

export function hasNewFighterLevelSpells(pc) {
  if (!isEldritchknight(pc)) return false;

  const knownSpellsNumber = getFighterTotalSpells(pc);
  if (knownSpellsNumber > getKnownSpells(pc).length) return true;

  return false;
}

export function hasNewFighterSpells(pc) {
  const newSpells = hasNewFighterLevelSpells(pc);

  return newSpells;
}

export function maxFighterSpellLevel(pc) {
  return fighterSpellSlots(pc).length;
}

export function hasToLearnKnightSpell(pc) {
  const { level } = pc;

  const knightSpells = getKnightSpells(pc);

  if (level >= 20) return knightSpells.length < 4;
  if (level >= 14) return knightSpells.length < 3;
  if (level >= 8) return knightSpells.length < 2;
  return knightSpells.length < 1;
}

export function getMaxKnightSpells(pc) {
  const { level } = pc;

  return level >= 20 ? 4 : level >= 14 ? 3 : level >= 8 ? 2 : 1;
}
