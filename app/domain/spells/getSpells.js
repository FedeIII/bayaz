import { getLoreSpells, getMagicalSecretsSpells } from '../classes/bard/bard';
import {
  getInvocationsSpells,
  getPactSpells,
} from '../classes/warlock/warlock';
import { SPELL_LIST } from './spellList';

export function getSpell(spellName, spellClass) {
  return (
    SPELL_LIST.find(
      spell =>
        spell.name === spellName &&
        (!spellClass || spell.class.includes(spellClass))
    ) || {}
  );
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
