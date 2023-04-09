import { getStat, getStatMod } from '../characters';
import { getDruidLandCircle } from '../classes/druid/druid';
import { getKnownCantrips } from './getSpells';
import { SPELL_LIST } from './spellList';

export const DRUID_SPELLS = SPELL_LIST.filter(spell =>
  spell.class.includes('druid')
);

function druidSpellSlots(pc) {
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

export function getDruidCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    2, 2, 2,
    3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  ][level - 1];
}

export function getDruidSpellSlots(pc) {
  return [getDruidCantripsNumber(pc), ...druidSpellSlots(pc)];
}

export function getDruidMaxPreparedSpells(pc) {
  const { level } = pc;

  const extraSpells = getDruidExtraPreparedSpells(pc);

  let totalSpells = getStatMod(getStat(pc, 'wis')) + level;
  totalSpells = totalSpells > 1 ? totalSpells : 1;

  return totalSpells + extraSpells.length;
}

export function getDruidExtraPreparedSpells(pc) {
  const landCircle = getDruidLandCircle(pc);

  if (!landCircle) return [];

  return Object.values(DRUID_SPELLS).filter(
    spell =>
      pc.level >= spell.level * 2 - 1 && spell.circles?.includes(landCircle)
  );
}

export function hasNewDruidCantrips(pc) {
  const knownCantripsNumber = getDruidCantripsNumber(pc);
  if (knownCantripsNumber > getKnownCantrips(pc).length) return true;

  return false;
}

export function maxDruidSpellLevel(pc) {
  return druidSpellSlots(pc).length;
}
