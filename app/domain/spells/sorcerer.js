import { getKnownCantrips, getKnownSpells } from './getSpells';
import { SPELL_LIST } from './spellList';

export const SORCERER_SPELLS = SPELL_LIST.filter(spell =>
  spell.class.includes('sorcerer')
);

function sorcererSpellSlots(pc) {
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

export function getSorcererSpellSlots(pc) {
  return [getSorcererCantripsNumber(pc), ...sorcererSpellSlots(pc)];
}

export function getSorcererCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    4,4,4,
    5,5,5,5,5,5,
    6,6,6,6,6,6,6,6,6,6,6
  ][level - 1];
}

export function getSorcererTotalSpells(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    2,3,4,5,6,7,8,9,10,11,
    12,12,13,13,14,14,
    15,15,15,15,
  ][level - 1]
}

export function getMaxSorcereryPoints(pc) {
  const { level } = pc;
  return [
    0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ][level - 1];
}

export function getCurrentSorcereryPoints(pc) {
  return pc.classAttrs?.sorcerer?.fontOfMagic || 0;
}

export function hasNewSorcererCantrips(pc) {
  const knownCantripsNumber = getSorcererCantripsNumber(pc);
  if (knownCantripsNumber > getKnownCantrips(pc).length) return true;

  return false;
}

export function hasNewSorcererLevelSpells(pc) {
  const knownSpellsNumber = getSorcererTotalSpells(pc);
  if (knownSpellsNumber > getKnownSpells(pc).length) return true;

  return false;
}

export function hasNewSorcererSpells(pc) {
  const newSpells = hasNewSorcererLevelSpells(pc);

  return newSpells;
}

export function maxSorcererSpellLevel(pc) {
  return sorcererSpellSlots(pc).length;
}
