import { getLoreSpells, getMagicalSecretsSpells } from '../classes/bard/bard';
import { getBonusCantrip } from '../classes/druid/druid';
import {
  getArcanum,
  getInvocationsSpells,
  getPactSpells,
} from '../classes/warlock/warlock';
import { SPELL_LIST } from './spellList';
import {
  doesNotHaveToLearnSpells,
  getClassSpells,
  hasToLearnSpells,
  maxSpellLevel,
} from './spells';

export function getSpell(spellName) {
  return SPELL_LIST.find(spell => spell.name === spellName) || {};
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

  const pactSpells = getPactSpells(pc);
  const druidBonusCantrip = getBonusCantrip(pc);
  const bonusCantrips = druidBonusCantrip ? [druidBonusCantrip] : [];

  return (
    [...spells, ...pactSpells, ...bonusCantrips]
      .map(pSpell => getSpell(pSpell.name))
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

  return (
    [
      ...knownSpells,
      ...loreSpells,
      ...invocationsSpells,
      ...pactSpells,
      ...arcanumSpells,
    ]
      .map(pSpell => getSpell(pSpell.name))
      .filter(spell => spell.level > 0) || []
  );
}
