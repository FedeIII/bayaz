import {
  CLASSES,
  getProficiencyBonus,
  getStat,
  getStatMod,
  RACES,
} from '../characters';
import {
  CLERIC_SPELLS,
  getClericCantripsNumber,
  getClericExtraPreparedSpells,
  getClericMaxPreparedSpells,
  getClericSpellSlots,
} from './cleric';
import {
  DRUID_SPELLS,
  getDruidCantripsNumber,
  getDruidMaxPreparedSpells,
  getDruidSpellSlots,
} from './druid';
import {
  getWarlockCantripsNumber,
  getWarlockSpellSlots,
  getWarlockTotalSpells,
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
  SORCERER_SPELLS,
} from './sorcerer';
import {
  getWizardCantripsNumber,
  getWizardMaxPreparedSpells,
  getWizardSpellSlots,
  getWizardTotalSpells,
  WIZARD_SPELLS,
} from './wizard';
import { getKnownSpells, getSpell } from './getSpells';
import { SPELL_TRANSLATIONS } from './spellTranslations';
import { SPELL_LIST } from './spellList';
import {
  getForgottenLoreSpells,
  getForgottenMagicalSecretsSpells,
  getLoreSpells,
  getMagicalSecretsSpells,
} from '../bard/bard';

const zero = () => 0;

export function getClassSpells(pc) {
  const { pClass } = pc;

  if (pClass === 'bard')
    return [
      ...BARD_SPELLS,
      ...getForgottenLoreSpells(pc).map(s => getSpell(s.name)),
      ...getForgottenMagicalSecretsSpells(pc).map(s => getSpell(s.name)),
    ];

  return [];
}

export function getAllClassesWithSpells() {
  return [...new Set(SPELL_LIST.map(s => s.class).flat())].filter(
    c => c !== 'ritual caster'
  );
}

export function getAllSpellSchools() {
  return [
    'Conjuration',
    'Abjuration',
    'Transmutation',
    'Enchantment',
    'Necromancy',
    'Divination',
    'Evocation',
    'Illusion',
  ];
}

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
    sorcerer: getSorcererCantripsNumber,
    wizard: getWizardCantripsNumber,
  }[pClass];

  if (getClassCantripsNumber) return getClassCantripsNumber(pc);
  else return 0;
}

export function getTotalSpells(pc) {
  const { pClass } = pc;

  const getClassTotalSpells = {
    bard: getBardTotalSpells,
    warlock: getWarlockTotalSpells,
    sorcerer: getSorcererTotalSpells,
    wizard: getWizardTotalSpells,
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
    sorcerer: getSorcererSpellSlots,
    wizard: getWizardSpellSlots,
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
  }[pClass];

  if (getClassMaxPreparedSpells) return getClassMaxPreparedSpells(pc);
  else return null;
}

export function getExtraPreparedSpells(pc) {
  const { pClass } = pc;

  const getClassExtraPreparedSpells = {
    cleric: getClericExtraPreparedSpells,
  }[pClass];

  if (getClassExtraPreparedSpells) return getClassExtraPreparedSpells(pc);
  else return [];
}

export function hasToPrepareSpells(pc) {
  const { pClass } = pc;

  return ['cleric', 'druid', 'wizard'].includes(pClass);
}

export function doesNotHaveToPrepareSpells(pc) {
  const { pClass } = pc;

  return ['bard', 'warlock', 'sorcerer'].includes(pClass);
}

export function getSpellcastingAbility(pc, spellType) {
  const { pClass, race, subrace } = pc;
  const casterType = spellType || pClass;

  return (
    CLASSES[casterType].spellcastingAbility ||
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

export function divideSpells(pc) {
  const { spells } = pc;

  const loreSpells = getLoreSpells(pc);
  const magicalSecretsSpells = getMagicalSecretsSpells(pc);

  return [...spells, ...loreSpells, ...magicalSecretsSpells].reduce(
    (spellsByLevel, pSpell) => {
      const spell = getSpell(pSpell.name, pSpell.type);
      if (typeof spell?.level === 'number') {
        spellsByLevel[spell.level] = [...spellsByLevel[spell.level], spell];
      }
      return spellsByLevel;
    },
    Array(10).fill([])
  );
}

export function isPreparedSpell(pc, spellName) {
  const { preparedSpells } = pc;

  return !!preparedSpells.find(spell => spell.name === spellName);
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
    }[pClass] || zero
  )(pc);
}

export function hasNewLevelSpells(pc) {
  const { pClass } = pc;

  return (
    {
      bard: hasNewBardLevelSpells,
    }[pClass] || zero
  )(pc);
}

export function hasNewSpells(pc) {
  const { pClass } = pc;

  return (
    {
      bard: hasNewBardSpells,
    }[pClass] || zero
  )(pc);
}

export function maxSpellLevel(pc) {
  const { pClass } = pc;

  return (
    {
      bard: maxBardSpellLevel,
    }[pClass] || zero
  )(pc);
}

export function hasLearnedSpellsForCurrentLevel(pc) {
  const {
    magic: { hasLearnedSpells },
    level,
  } = pc;

  return !!hasLearnedSpells[level - 1]
}
