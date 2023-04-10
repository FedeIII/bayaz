import { getKnownSpells } from './getSpells';
import { SPELL_LIST } from './spellList';

export const RANGER_SPELLS = SPELL_LIST.filter(spell =>
  spell.class.includes('ranger')
);

function rangerSpellSlots(pc) {
  const { level } = pc;
  return [
    /*  1 */ [],
    /*  2 */ [2],
    /*  3 */ [3],
    /*  4 */ [3],
    /*  5 */ [4, 2],
    /*  6 */ [4, 2],
    /*  7 */ [4, 2],
    /*  8 */ [4, 3],
    /*  9 */ [4, 3, 2],
    /* 10 */ [4, 3, 2],
    /* 11 */ [4, 3, 3],
    /* 12 */ [4, 3, 3],
    /* 13 */ [4, 3, 3, 1],
    /* 14 */ [4, 3, 3, 1],
    /* 15 */ [4, 3, 3, 2],
    /* 16 */ [4, 3, 3, 2],
    /* 17 */ [4, 3, 3, 3, 1],
    /* 18 */ [4, 3, 3, 3, 1],
    /* 19 */ [4, 3, 3, 3, 2],
    /* 20 */ [4, 3, 3, 3, 2],
  ][level - 1];
}

export function getRangerSpellSlots(pc) {
  return [getRangerCantripsNumber(pc), ...rangerSpellSlots(pc)];
}

export function getRangerCantripsNumber(pc) {
  return 0;
}

export function getRangerTotalSpells(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    0, 2,
    3, 3,
    4, 4,
    5, 5,
    6, 6,
    7, 7,
    8, 8,
    9, 9,
    10, 10,
    11, 11
  ][level - 1]
}

export function hasNewRangerCantrips(pc) {
  return false;
}

export function hasNewRangerLevelSpells(pc) {
  const knownSpellsNumber = getRangerTotalSpells(pc);

  if (knownSpellsNumber > getKnownSpells(pc).length) return true;

  return false;
}

export function hasNewRangerSpells(pc) {
  const newSpells = hasNewRangerLevelSpells(pc);

  return newSpells;
}

export function maxRangerSpellLevel(pc) {
  return rangerSpellSlots(pc).length;
}
