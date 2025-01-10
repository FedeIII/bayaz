import {
  CLASSES,
  getProficiencyBonus,
  getStat,
  getStatMod,
  isDrow,
  isHighElf,
  RACES,
} from '../characters';
import {
  CLERIC_SPELLS,
  getClericCantripsNumber,
  getClericExtraPreparedSpells,
  getClericMaxPreparedSpells,
  getClericSpellSlots,
  hasNewClericCantrips,
  maxClericSpellLevel,
} from './cleric';
import {
  DRUID_SPELLS,
  getDruidCantripsNumber,
  getDruidExtraPreparedSpells,
  getDruidMaxPreparedSpells,
  getDruidSpellSlots,
  hasNewDruidCantrips,
  maxDruidSpellLevel,
} from './druid';
import {
  getPatron,
  getWarlockCantripsNumber,
  getWarlockSpellSlots,
  getWarlockSpellSlotsLevel,
  getWarlockTotalSpells,
  hasNewWarlockCantrips,
  hasNewWarlockLevelSpells,
  hasNewWarlockSpells,
  WARLOCK_SPELLS,
} from './warlock';
import {
  BARD_SPELLS,
  getBardCantripsNumber,
  getBardSpellSlots,
  getBardTotalSpells,
  hasNewBardCantrips,
  hasNewBardLevelSpells,
  hasNewBardSpells,
  maxBardSpellLevel,
} from './bard';
import {
  getSorcererCantripsNumber,
  getSorcererSpellSlots,
  getSorcererTotalSpells,
  hasNewSorcererCantrips,
  hasNewSorcererLevelSpells,
  hasNewSorcererSpells,
  maxSorcererSpellLevel,
  SORCERER_SPELLS,
} from './sorcerer';
import {
  getWizardCantripsNumber,
  getWizardMaxPreparedSpells,
  getWizardSpellSlots,
  getWizardTotalSpells,
  hasNewWizardCantrips,
  hasNewWizardLevelSpells,
  hasNewWizardSpells,
  maxWizardSpellLevel,
  WIZARD_SPELLS,
} from './wizard';
import {
  getAllPcCantrips,
  getAllPcSpells,
  getKnownSpells,
  getSpell,
} from './getSpells';
import { SPELL_TRANSLATIONS } from './spellTranslations';
import { SPELL_LIST } from './spellList';
import {
  getForgottenLoreSpells,
  getForgottenMagicalSecretsSpells,
} from '../classes/bard/bard';
import { getDivineDomain } from '../classes/cleric/cleric';
import { getDruidLandCircle } from '../classes/druid/druid';
import {
  getRangerCantripsNumber,
  getRangerSpellSlots,
  getRangerTotalSpells,
  hasNewRangerCantrips,
  hasNewRangerLevelSpells,
  hasNewRangerSpells,
  maxRangerSpellLevel,
  RANGER_SPELLS,
} from './ranger';
import { isEldritchknight } from '../classes/fighter/fighter';
import {
  FIGHTER_SPELLS,
  getFighterCantripsNumber,
  getFighterSpellSlots,
  getFighterTotalSpells,
  hasNewFighterCantrips,
  hasNewFighterLevelSpells,
  hasNewFighterSpells,
  maxFighterSpellLevel,
} from './fighter';
import {
  getPaladinCantripsNumber,
  getPaladinExtraPreparedSpells,
  getPaladinMaxPreparedSpells,
  getPaladinSpellSlots,
  hasNewPaladinCantrips,
  maxPaladinSpellLevel,
  PALADIN_SPELLS,
} from './paladin';
import { getSacredOath } from '../classes/paladin/paladin';
import { isArcaneTrickster } from '../classes/rogue/rogue';
import {
  getRogueCantripsNumber,
  getRogueSpellSlots,
  getRogueTotalSpells,
  hasNewRogueCantrips,
  hasNewRogueLevelSpells,
  hasNewRogueSpells,
  maxRogueSpellLevel,
  ROGUE_SPELLS,
} from './rogue';
import { getKnownCantrips } from './getSpells';
import { isWayOfTheFourElements } from '../classes/monk/monk';

const zero = () => 0;

export function getClassSpells(pc) {
  const { pClass } = pc;

  if (pClass === 'bard')
    return [
      ...BARD_SPELLS,
      ...getForgottenLoreSpells(pc).map(s => getSpell(s.name)),
      ...getForgottenMagicalSecretsSpells(pc).map(s => getSpell(s.name)),
    ];

  if (pClass === 'warlock')
    return WARLOCK_SPELLS.filter(
      spell => !spell.patrons || spell.patrons.includes(getPatron(pc))
    );

  if (pClass === 'cleric')
    return CLERIC_SPELLS.filter(
      spell => !spell.domains || spell.domains.includes(getDivineDomain(pc))
    );

  if (pClass === 'druid')
    return DRUID_SPELLS.filter(
      spell => !spell.circles || spell.circles.includes(getDruidLandCircle(pc))
    );

  if (pClass === 'ranger') return RANGER_SPELLS;

  if (pClass === 'fighter' && isEldritchknight(pc)) return FIGHTER_SPELLS;

  if (pClass === 'wizard') return WIZARD_SPELLS;

  if (pClass === 'sorcerer') return SORCERER_SPELLS;

  if (pClass === 'paladin')
    return PALADIN_SPELLS.filter(
      spell => !spell.oaths || spell.oaths.includes(getSacredOath(pc))
    );

  if (pClass === 'rogue' && isArcaneTrickster(pc)) return ROGUE_SPELLS;

  return [];
}

export function getAllClassesWithSpells() {
  return [...new Set(SPELL_LIST.map(s => s.class).flat())].filter(
    c => c !== 'ritual caster'
  );
}

export const SPELL_SCHOOLS = [
  'Conjuration',
  'Abjuration',
  'Transmutation',
  'Enchantment',
  'Necromancy',
  'Divination',
  'Evocation',
  'Illusion',
];

export function translateSpell(spellName) {
  return SPELL_TRANSLATIONS[spellName] || `[[<--- ${spellName} --->]]`;
}

export function getCantripsNumber(pc) {
  const { pClass } = pc;

  const getClassCantripsNumber = {
    bard: getBardCantripsNumber,
    warlock: getWarlockCantripsNumber,
    cleric: getClericCantripsNumber,
    druid: getDruidCantripsNumber,
    ranger: getRangerCantripsNumber,
    fighter: getFighterCantripsNumber,
    sorcerer: getSorcererCantripsNumber,
    wizard: getWizardCantripsNumber,
    paladin: getPaladinCantripsNumber,
    rogue: getRogueCantripsNumber,
  }[pClass];

  if (getClassCantripsNumber) return getClassCantripsNumber(pc);
  else return 0;
}

export function getTotalSpells(pc) {
  const { pClass } = pc;

  const getClassTotalSpells = {
    bard: getBardTotalSpells,
    warlock: getWarlockTotalSpells,
    ranger: getRangerTotalSpells,
    fighter: getFighterTotalSpells,
    sorcerer: getSorcererTotalSpells,
    wizard: getWizardTotalSpells,
    rogue: getRogueTotalSpells,
  }[pClass];

  if (getClassTotalSpells) return getClassTotalSpells(pc);
  else return 0;
}

export function getSpellSlots(pc) {
  const { pClass } = pc;

  const getClassSpellSlots = {
    bard: getBardSpellSlots,
    warlock: getWarlockSpellSlots,
    cleric: getClericSpellSlots,
    druid: getDruidSpellSlots,
    ranger: getRangerSpellSlots,
    fighter: getFighterSpellSlots,
    sorcerer: getSorcererSpellSlots,
    wizard: getWizardSpellSlots,
    paladin: getPaladinSpellSlots,
    rogue: getRogueSpellSlots,
  }[pClass];

  if (getClassSpellSlots) return getClassSpellSlots(pc);
  else return [];
}

export function getMaxPreparedSpells(pc) {
  const { pClass } = pc;

  const getClassMaxPreparedSpells = {
    cleric: getClericMaxPreparedSpells,
    druid: getDruidMaxPreparedSpells,
    wizard: getWizardMaxPreparedSpells,
    paladin: getPaladinMaxPreparedSpells,
  }[pClass];

  if (getClassMaxPreparedSpells) return getClassMaxPreparedSpells(pc);
  else return null;
}

export function getExtraPreparedSpells(pc) {
  const { pClass } = pc;

  const getClassExtraPreparedSpells = {
    cleric: getClericExtraPreparedSpells,
    druid: getDruidExtraPreparedSpells,
    paladin: getPaladinExtraPreparedSpells,
  }[pClass];

  if (getClassExtraPreparedSpells) return getClassExtraPreparedSpells(pc);
  else return [];
}

export function hasToLearnSpells(pc) {
  const { pClass } = pc;

  return (
    ['bard', 'warlock', 'ranger', 'sorcerer', 'wizard'].includes(pClass) ||
    (pClass === 'fighter' && isEldritchknight(pc)) ||
    (pClass === 'rogue' && isArcaneTrickster(pc))
  );
}

export function doesNotHaveToLearnSpells(pc) {
  const { pClass } = pc;

  return ['cleric', 'druid', 'monk', 'paladin'].includes(pClass);
}

export function hasToPrepareSpells(pc) {
  const { pClass } = pc;

  return ['cleric', 'druid', 'wizard', 'paladin'].includes(pClass);
}

export function doesNotHaveToPrepareSpells(pc) {
  const { pClass } = pc;

  return (
    ['bard', 'warlock', 'ranger', 'sorcerer'].includes(pClass) ||
    (pClass === 'fighter' && isEldritchknight(pc)) ||
    (pClass === 'rogue' && isArcaneTrickster(pc))
  );
}

export function getSpellcastingAbility(pc, spellType) {
  const { pClass, race, subrace } = pc;
  const casterType = spellType || pClass;

  return (
    CLASSES()[casterType].spellcastingAbility ||
    RACES[race][subrace].spellcastingAbility ||
    '-'
  );
}

export function getSpellAttackBonus(pc, spellType) {
  const { level, pClass } = pc;
  if (!spellType) spellType = pClass;

  return (
    getProficiencyBonus(level) +
    getStatMod(getStat(pc, getSpellcastingAbility(pc, spellType)))
  );
}

export function getSpellSavingThrow(pc, spellType) {
  return 8 + getSpellAttackBonus(pc, spellType);
}

export function divideSpellsByLevel(pc) {
  return [...getAllPcCantrips(pc), ...getAllPcSpells(pc)].reduce(
    (spellsByLevel, pSpell) => {
      const spell = getSpell(pSpell.name, pSpell);
      if (typeof spell?.level === 'number') {
        spellsByLevel[spell.level] = [...spellsByLevel[spell.level], spell];
      } else {
        console.error(`Spell ${pSpell.name} has no level`);
      }
      return spellsByLevel;
    },
    Array(10).fill([])
  );
}

export function isPreparedSpell(pc, spellName) {
  const { preparedSpells } = pc;

  if (doesNotHaveToPrepareSpells(pc)) return true;

  return !!preparedSpells.find(spell => spell.name === spellName);
}

export function getNewCantripsAmount(pc) {
  const newKnownCantripsNumber = getCantripsNumber(pc);
  const currentKnownCantripsNumber = getKnownCantrips(pc).length;

  return newKnownCantripsNumber - currentKnownCantripsNumber;
}

export function getNewSpellsAmount(pc) {
  const newKnownSpellsNumber = getTotalSpells(pc);
  const currentKnownSpellsNumber = getKnownSpells(pc).length;

  return newKnownSpellsNumber - currentKnownSpellsNumber;
}

export function hasNewCantrips(pc) {
  const { pClass } = pc;

  return (
    {
      bard: hasNewBardCantrips,
      warlock: hasNewWarlockCantrips,
      cleric: hasNewClericCantrips,
      druid: hasNewDruidCantrips,
      ranger: hasNewRangerCantrips,
      fighter: hasNewFighterCantrips,
      sorcerer: hasNewSorcererCantrips,
      wizard: hasNewWizardCantrips,
      paladin: hasNewPaladinCantrips,
      rogue: hasNewRogueCantrips,
    }[pClass] || zero
  )(pc);
}

export function hasNewLevelSpells(pc) {
  const { pClass } = pc;

  return (
    {
      bard: hasNewBardLevelSpells,
      warlock: hasNewWarlockLevelSpells,
      ranger: hasNewRangerLevelSpells,
      fighter: hasNewFighterLevelSpells,
      sorcerer: hasNewSorcererLevelSpells,
      wizard: hasNewWizardLevelSpells,
      rogue: hasNewRogueLevelSpells,
    }[pClass] || zero
  )(pc);
}

export function hasNewSpells(pc) {
  const { pClass } = pc;

  return (
    {
      bard: hasNewBardSpells,
      warlock: hasNewWarlockSpells,
      ranger: hasNewRangerSpells,
      fighter: hasNewFighterSpells,
      sorcerer: hasNewSorcererSpells,
      wizard: hasNewWizardSpells,
      rogue: hasNewRogueSpells,
    }[pClass] || zero
  )(pc);
}

export function maxSpellLevel(pc) {
  const { pClass } = pc;

  return (
    {
      bard: maxBardSpellLevel,
      warlock: getWarlockSpellSlotsLevel,
      cleric: maxClericSpellLevel,
      druid: maxDruidSpellLevel,
      ranger: maxRangerSpellLevel,
      fighter: maxFighterSpellLevel,
      sorcerer: maxSorcererSpellLevel,
      wizard: maxWizardSpellLevel,
      paladin: maxPaladinSpellLevel,
      rogue: maxRogueSpellLevel,
    }[pClass] || zero
  )(pc);
}

export function hasLearnedSpellsForCurrentLevel(pc) {
  const {
    magic: { hasLearnedSpells },
    level,
  } = pc;

  return !!hasLearnedSpells[level - 1];
}

export function getDeltaSpells(pc) {
  const dSpells =
    getTotalSpells(pc) - getTotalSpells({ ...pc, level: pc.level - 1 });

  const dCantrips =
    getCantripsNumber(pc) - getCantripsNumber({ ...pc, level: pc.level - 1 });

  return dSpells + dCantrips;
}

export function isSpellcaster(pc) {
  return ['wizard', 'sorcerer', 'cleric', 'druid', 'bard', 'warlock'].includes(
    pc.pClass
  );
}

export function canCastSpells(pc) {
  return (
    isSpellcaster(pc) ||
    (pc.pClass === 'ranger' && pc.level >= 2) ||
    (pc.pClass === 'paladin' && pc.level >= 2) ||
    (pc.pClass === 'fighter' && isEldritchknight(pc)) ||
    (pc.pClass === 'rogue' && isArcaneTrickster(pc)) ||
    (pc.pClass === 'monk' && isWayOfTheFourElements(pc)) ||
    isHighElf(pc) ||
    isDrow(pc)
  );
}
