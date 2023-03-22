import { getKnownCantrips, getKnownSpells } from './getSpells';
import { SPELL_LIST } from './spellList';

export function getBardSpells() {
  return SPELL_LIST.filter(spell => spell.class.includes('bard'));
}

export const BARD_SPELLS = SPELL_LIST.filter(spell =>
  spell.class.includes('bard')
);

function bardSpellSlots(pc) {
  const { level } = pc;
  return [
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
  ][level - 1];
}

export function getBardSpellSlots(pc) {
  return [getBardCantripsNumber(pc), ...bardSpellSlots(pc)];
}

export function getBardCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    2,2,2,
    3,3,3,3,3,3,
    4,4,4,4,4,4,4,4,4,4,4
  ][level - 1];
}

export function getBardTotalSpells(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    4,5,6,7,8,9,10,11,12,
    14,15,15,
    16,18,19,19,
    20,22,22,22
  ][level - 1]
}

export function hasNewBardCantrips(pc) {
  const knownCantripsNumber = getBardCantripsNumber(pc);
  if (knownCantripsNumber > getKnownCantrips(pc).length) return true;

  return false;
}

export function hasNewBardLevelSpells(pc) {
  const knownSpellsNumber = getBardTotalSpells(pc);
  if (knownSpellsNumber > getKnownSpells(pc).length) return true;

  return false;
}

export function hasNewBardSpells(pc) {
  const newCantrips = hasNewBardCantrips(pc);
  const newSpells = hasNewBardLevelSpells(pc);

  return newCantrips || newSpells;
}

export function maxBardSpellLevel(pc) {
  return bardSpellSlots(pc).length;
}
