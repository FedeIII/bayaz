import {
  getArcaneTricksterSpells,
  isArcaneTrickster,
} from '../classes/rogue/rogue';
import { getKnownCantrips, getKnownSpells } from './getSpells';
import { SPELL_LIST } from './spellList';

export const ROGUE_SPELLS = SPELL_LIST.filter(
  spell =>
    spell.class.includes('wizard') &&
    (spell.level === 0 || ['Enchantment', 'Illusion'].includes(spell.school))
);

export function hasToLearnArcaneTricksterSpell(pc) {
  const { level } = pc;

  const arcaneTricksterSpells = getArcaneTricksterSpells(pc);

  if (level >= 20) return arcaneTricksterSpells.length < 4;
  if (level >= 14) return arcaneTricksterSpells.length < 3;
  if (level >= 8) return arcaneTricksterSpells.length < 2;
  return arcaneTricksterSpells.length < 1;
}

export function getMaxArcaneTricksterSpells(pc) {
  const { level } = pc;

  return level >= 20 ? 4 : level >= 14 ? 3 : level >= 8 ? 2 : 1;
}

function rogueSpellSlots(pc) {
  const { level } = pc;

  if (!isArcaneTrickster(pc)) return [];

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

export function getRogueSpellSlots(pc) {
  return [getRogueCantripsNumber(pc), ...rogueSpellSlots(pc)];
}

export function getRogueCantripsNumber(pc) {
  const { level } = pc;

  if (!isArcaneTrickster(pc)) return [];

  /* prettier-ignore */
  return [
    /*  1 */ 0,
    /*  2 */ 0,
    /*  3 */ 3,
    /*  4 */ 3,
    /*  5 */ 3,
    /*  6 */ 3,
    /*  7 */ 3,
    /*  8 */ 3,
    /*  9 */ 3,
    /* 10 */ 4,
    /* 11 */ 4,
    /* 12 */ 4,
    /* 13 */ 4,
    /* 14 */ 4,
    /* 15 */ 4,
    /* 16 */ 4,
    /* 17 */ 4,
    /* 18 */ 4,
    /* 19 */ 4,
    /* 20 */ 4,
  ][level - 1];
}

export function getRogueTotalSpells(pc) {
  const { level } = pc;

  if (!isArcaneTrickster(pc)) return [];

  /* prettier-ignore */
  return [
    /*  1 */ 0,
    /*  2 */ 0,
    /*  3 */ 3,
    /*  4 */ 4,
    /*  5 */ 4,
    /*  6 */ 4,
    /*  7 */ 5,
    /*  8 */ 6,
    /*  9 */ 6,
    /* 10 */ 7,
    /* 11 */ 8,
    /* 12 */ 8,
    /* 13 */ 9,
    /* 14 */ 10,
    /* 15 */ 10,
    /* 16 */ 11,
    /* 17 */ 11,
    /* 18 */ 11,
    /* 19 */ 12,
    /* 20 */ 13,
  ][level - 1]
}

export function hasNewRogueCantrips(pc) {
  if (!isArcaneTrickster(pc)) return false;

  const knownCantripsNumber = getRogueCantripsNumber(pc);
  if (knownCantripsNumber > getKnownCantrips(pc).length) return true;

  return false;
}

export function hasNewRogueLevelSpells(pc) {
  if (!isArcaneTrickster(pc)) return false;

  const knownSpellsNumber = getRogueTotalSpells(pc);
  if (knownSpellsNumber > getKnownSpells(pc).length) return true;

  return false;
}

export function hasNewRogueSpells(pc) {
  const newSpells = hasNewRogueLevelSpells(pc);

  return newSpells;
}

export function maxRogueSpellLevel(pc) {
  return rogueSpellSlots(pc).length;
}
