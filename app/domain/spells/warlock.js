import { getKnownCantrips, getKnownSpells, getSpell } from './getSpells';
import { SPELL_LIST } from './spellList';

export const WARLOCK_SPELLS = SPELL_LIST.filter(spell =>
  spell.class.includes('warlock')
);

function warlockSpellSlots(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
        /*  1 */ 1,
        /*  2 */ 2,
        /*  3 */ 2,
        /*  4 */ 2,
        /*  5 */ 2,
        /*  6 */ 2,
        /*  7 */ 2,
        /*  8 */ 2,
        /*  9 */ 2,
        /* 10 */ 2,
        /* 11 */ 3,
        /* 12 */ 3,
        /* 13 */ 3,
        /* 14 */ 3,
        /* 15 */ 3,
        /* 16 */ 3,
        /* 17 */ 4,
        /* 18 */ 4,
        /* 19 */ 4,
        /* 20 */ 4,
  ][level - 1];
}

export function getWarlockSpellSlotsLevel(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
        /*  1 */ 1,
        /*  2 */ 1,
        /*  3 */ 2,
        /*  4 */ 2,
        /*  5 */ 3,
        /*  6 */ 3,
        /*  7 */ 4,
        /*  8 */ 4,
        /*  9 */ 5,
        /* 10 */ 5,
        /* 11 */ 5,
        /* 12 */ 5,
        /* 13 */ 5,
        /* 14 */ 5,
        /* 15 */ 5,
        /* 16 */ 5,
        /* 17 */ 5,
        /* 18 */ 5,
        /* 19 */ 5,
        /* 20 */ 5,
  ][level - 1];
}

export function getWarlockSpellSlots(pc) {
  return [getWarlockCantripsNumber(pc), warlockSpellSlots(pc)];
}

export function getWarlockCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    2, 2, 2,
    3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
  ][level - 1];
}

export function getWarlockTotalSpells(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 10,
    11, 11, 12, 12, 13, 13,
    14, 14, 15, 15
  ][level - 1];
}

export function getSpellPatrons(spell) {
  return spell.archetype?.warlock || [];
}

export function getPatron(pc) {
  const { classAttrs: { warlock } = {} } = pc;

  return warlock?.patron;
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

export function isSpellFromPatron(pc, spell) {
  if (isString(spell)) spell = getSpell(spell);

  return getSpellPatrons(spell).includes(getPatron(pc));
}

export function isSpellFrom(spell, patron) {
  if (isString(spell)) spell = getSpell(spell);

  return getSpellPatrons(spell).includes(patron);
}

export function hasNewWarlockCantrips(pc) {
  const knownCantripsNumber = getWarlockCantripsNumber(pc);
  if (knownCantripsNumber > getKnownCantrips(pc).length) return true;

  return false;
}

export function hasNewWarlockLevelSpells(pc) {
  const knownSpellsNumber = getWarlockTotalSpells(pc);

  if (knownSpellsNumber > getKnownSpells(pc).length) return true;

  return false;
}

export function hasNewWarlockSpells(pc) {
  const newCantrips = hasNewWarlockCantrips(pc);
  const newSpells = hasNewWarlockLevelSpells(pc);

  return !(newCantrips || newSpells);
}
