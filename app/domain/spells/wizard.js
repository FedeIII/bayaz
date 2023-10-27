import { getStat, getStatMod } from '../characters';
import { getArcaneTradition } from '../classes/wizard/wizard';
import { getKnownCantrips, getKnownSpells, getSpell } from './getSpells';
import { SPELL_LIST } from './spellList';

export const WIZARD_SPELLS = SPELL_LIST.filter(spell =>
  spell.class.includes('wizard')
);

function wizardSpellSlots(pc) {
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

export function getWizardCantripsNumber(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    3, 3, 3,
    4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  ][level - 1];
}

export function getWizardSpellSlots(pc) {
  return [getWizardCantripsNumber(pc), ...wizardSpellSlots(pc)];
}

export function getWizardTotalSpells(pc) {
  const { level } = pc;

  return 6 + (level - 1) * 2;
}

export function getWizardMaxPreparedSpells(pc) {
  const { level } = pc;

  const totalSpells = getStatMod(getStat(pc, 'int')) + level;
  return totalSpells > 1 ? totalSpells : 1;
}

export function maxWizardSpellLevel(pc) {
  return wizardSpellSlots(pc).length;
}

export function hasNewWizardCantrips(pc) {
  const knownCantripsNumber = getWizardCantripsNumber(pc);
  if (knownCantripsNumber > getKnownCantrips(pc).length) return true;

  return false;
}

export function hasNewWizardLevelSpells(pc) {
  const knownSpellsNumber = getWizardTotalSpells(pc);
  if (knownSpellsNumber > getKnownSpells(pc).length) return true;

  return false;
}

export function hasNewWizardSpells(pc) {
  const newSpells = hasNewWizardLevelSpells(pc);

  return newSpells;
}

export function getWizardExtraKnownSpells(pc) {
  const extraSpells = [...(pc.classAttrs?.wizard?.extraSpells || [])];
  const school = getArcaneTradition(pc);

  if (school === 'Necromancy' && pc.level >= 6)
    extraSpells.push(getSpell('animateDead'));

  if (school === 'Transmutation' && pc.level >= 10)
    extraSpells.push(getSpell('polymorph'));

  return extraSpells;
}
