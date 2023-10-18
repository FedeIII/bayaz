import { getStat, getStatMod } from '../characters';
import { SPELL_LIST } from './spellList';

export const PALADIN_SPELLS = SPELL_LIST.filter(spell =>
  spell.class.includes('paladin')
);

function paladinSpellSlots(pc) {
  const { level } = pc;
  return [
    /*  1 */ [],
    /*  2 */ [2],
    /*  3 */ [3],
    /*  4 */ [3],
    /*  5 */ [4, 2],
    /*  6 */ [4, 2],
    /*  7 */ [4, 3],
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

export function getPaladinSpellSlots(pc) {
  return [getPaladinCantripsNumber(pc), ...paladinSpellSlots(pc)];
}

export function getPaladinCantripsNumber(pc) {
  return 0;
}

export function hasNewPaladinCantrips(pc) {
  return false;
}

export function getPaladinMaxPreparedSpells(pc) {
  const { level } = pc;

  let totalSpells = getStatMod(getStat(pc, 'cha')) + Math.floor(level / 2);
  totalSpells = totalSpells > 1 ? totalSpells : 1;

  return totalSpells;
}

export function maxPaladinSpellLevel(pc) {
  return paladinSpellSlots(pc).length;
}
