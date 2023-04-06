import { getStat, getStatMod } from '../characters';
import { getDivineDomain } from '../classes/cleric/cleric';
import { getKnownCantrips } from './getSpells';
import { SPELL_LIST } from './spellList';

export const CLERIC_SPELLS = SPELL_LIST.filter(spell =>
  spell.class.includes('cleric')
);

function clericSpellSlots(pc) {
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

export function getClericCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    3, 3, 3,
    4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  ][level - 1];
}

export function getClericSpellSlots(pc) {
  return [getClericCantripsNumber(pc), ...clericSpellSlots(pc)];
}

export function getClericMaxPreparedSpells(pc) {
  const { level } = pc;

  const extraSpells = getClericExtraPreparedSpells(pc);

  let totalSpells = getStatMod(getStat(pc, 'wis')) + level;
  totalSpells = totalSpells > 1 ? totalSpells : 1;

  return totalSpells + extraSpells.length;
}

export function getClericExtraPreparedSpells(pc) {
  const divineDomain = getDivineDomain(pc);

  return Object.values(CLERIC_SPELLS).filter(
    spell =>
      pc.level >= spell.level * 2 - 1 && spell.domains?.includes(divineDomain)
  );
}

export function maxClericSpellLevel(pc) {
  return clericSpellSlots(pc).length;
}

export function hasNewClericCantrips(pc) {
  const knownCantripsNumber = getClericCantripsNumber(pc);
  if (knownCantripsNumber > getKnownCantrips(pc).length) return true;

  return false;
}
