import { getLoreSpells, getMagicalSecretsSpells } from '../classes/bard/bard';
import {
  getInvocationsSpells,
  getPactSpells,
} from '../classes/warlock/warlock';
import { SPELL_LIST } from './spellList';

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

  return (
    [...spells, ...pactSpells]
      .map(pSpell => getSpell(pSpell.name))
      .filter(spell => spell.level === 0) || []
  );
}

export function getKnownSpells(pc) {
  const { spells = [] } = pc;

  const magicalSecretsSpells = getMagicalSecretsSpells(pc);

  return (
    [...spells, ...magicalSecretsSpells]
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
  const { spells = [] } = pc;

  const loreSpells = getLoreSpells(pc);
  const magicalSecretsSpells = getMagicalSecretsSpells(pc);
  const invocationsSpells = getInvocationsSpells(pc);
  const pactSpells = getPactSpells(pc);

  return (
    [
      ...spells,
      ...loreSpells,
      ...magicalSecretsSpells,
      ...invocationsSpells,
      ...pactSpells,
    ]
      .map(pSpell => getSpell(pSpell.name))
      .filter(spell => spell.level > 0) || []
  );
}
