import { getLoreSpells } from '../bard/bard';
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
      .map(pSpell => getSpell(pSpell.name, pSpell.type))
      .filter(spell => spell.level === 0) || []
  );
}

export function getKnownSpells(pc) {
  const { spells = [] } = pc;

  const loreSpells = getLoreSpells(pc);

  return (
    [...spells, ...loreSpells]
      .map(pSpell => getSpell(pSpell.name, pSpell.type))
      .filter(spell => spell.level > 0) || []
  );
}

export function getKnownSpellsLevel(pc, spellLevel) {
  const { spells } = pc;

  return spells
    .map(pSpell => getSpell(pSpell.name, pSpell.type))
    .filter(spell => spell.level === spellLevel);
}
