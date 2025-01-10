import { unique } from '~/utils/array';
import { getLoreSpells, getMagicalSecretsSpells } from '../classes/bard/bard';
import { getBonusCantrip } from '../classes/druid/druid';
import { getKnightSpells } from '../classes/fighter/fighter';
import {
  getArcanum,
  getInvocationsSpells,
  getPactSpells,
} from '../classes/warlock/warlock';
import { getImprovedMinorIllusionSpell } from '../classes/wizard/wizard';
import { SPELL_LIST } from './spellList';
import {
  doesNotHaveToLearnSpells,
  getClassSpells,
  hasToLearnSpells,
  maxSpellLevel,
  translateSpell,
} from './spells';
import { getWizardExtraKnownSpells } from './wizard';
import {
  getMonasticTraditionCantrips,
  getMonkSpells,
} from '../classes/monk/monk';
import { getArcaneTricksterSpells } from '../classes/rogue/rogue';
import {
  getRitualCasterSpells,
  getSpellSniperCantrip,
} from '../feats/featUtils';

export function getSpell(spellName, props) {
  if (!spellName) return null;
  const baseSpell = SPELL_LIST.find(spell => spell.name === spellName) || {};

  if (props) {
    return { ...baseSpell, ...props };
  }
  return baseSpell;
}

export function getKnownCantrips(pc) {
  const { spells = [] } = pc;

  return (
    spells
      .map(pSpell => getSpell(pSpell.name))
      .filter(spell => spell.level === 0) || []
  );
}

export function getAllPcCantrips(pc) {
  const { spells = [] } = pc;

  // cantrips that don't count for the total known
  const pactSpells = getPactSpells(pc);
  const druidBonusCantrip = getBonusCantrip(pc);
  const bonusCantrips = druidBonusCantrip ? [druidBonusCantrip] : [];
  const illusionCantrip = getImprovedMinorIllusionSpell(pc);
  const monasticTraditionCantrips = getMonasticTraditionCantrips(pc);
  const spellSniperCantrip = getSpellSniperCantrip(pc);

  return (
    [
      ...spells,
      ...pactSpells,
      ...bonusCantrips,
      ...(spellSniperCantrip ? [spellSniperCantrip] : []),
      ...(illusionCantrip ? [illusionCantrip] : []),
      ...monasticTraditionCantrips,
    ]
      .map(pSpell => getSpell(pSpell.name, pSpell))
      .filter(spell => spell.level === 0) || []
  );
}

export function getKnownSpells(pc) {
  const { spells = [] } = pc;

  let pSpells = [];
  if (hasToLearnSpells(pc)) {
    pSpells = spells;
  } else if (doesNotHaveToLearnSpells(pc)) {
    pSpells = getClassSpells(pc).filter(
      spell => spell.level <= maxSpellLevel(pc)
    );
  }

  // spells that count for the total known
  const magicalSecretsSpells = getMagicalSecretsSpells(pc);

  return (
    [...pSpells, ...magicalSecretsSpells]
      .map(pSpell => getSpell(pSpell.name))
      .filter(spell => spell.level > 0) || []
  );
}

export function getKnownSpellsByLevel(pc) {
  const spells = getKnownSpells(pc);

  return spells.reduce((spellsByLevel, spell) => {
    spellsByLevel[spell.level - 1] = spellsByLevel[spell.level - 1] || [];
    spellsByLevel[spell.level - 1].push(spell);
    return spellsByLevel;
  }, []);
}

export function getAllPcSpells(pc) {
  const knownSpells = getKnownSpells(pc);

  // spells that don't count for the total known
  const loreSpells = getLoreSpells(pc);
  const invocationsSpells = getInvocationsSpells(pc);
  const pactSpells = getPactSpells(pc);
  const arcanumSpells = getArcanum(pc).map(getSpell);
  const knightSpells = getKnightSpells(pc);
  const wizardExtraSpells = getWizardExtraKnownSpells(pc);
  const monkSpells = getMonkSpells(pc);
  const rogueSpells = getArcaneTricksterSpells(pc);
  const ritualCasterSpells = getRitualCasterSpells(pc);

  return unique(
    [
      ...knownSpells,
      ...loreSpells,
      ...invocationsSpells,
      ...pactSpells,
      ...arcanumSpells,
      ...knightSpells,
      ...wizardExtraSpells,
      ...monkSpells,
      ...rogueSpells,
      ...ritualCasterSpells,
    ]
      .map(pSpell => getSpell(pSpell.name, pSpell))
      .filter(spell => spell.level > 0) || []
  );
}

export const ALL_SPELLS_BY_LEVEL = SPELL_LIST.reduce((spellsByLevel, spell) => {
  if (typeof spell?.level === 'number') {
    spellsByLevel[spell.level] = [...spellsByLevel[spell.level], spell];
  }
  return spellsByLevel;
}, Array(10).fill([]));

export const ALL_SPELLS_BY_TRANSLATION = SPELL_LIST.sort((s1, s2) =>
  translateSpell(s1.name) > translateSpell(s2.name) ? 1 : -1
).map(s => ({ name: s.name, translation: translateSpell(s.name) }));
