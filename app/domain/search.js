import { getAllItems } from './equipment/equipment';
import { SPELL_LIST } from './spells/spellList';
import { translateSpell } from './spells/spells';

export const MAX_RESULTS = 5;

function isSpellMatch(spell, search) {
  return (
    spell.name.includes(search) || translateSpell(spell.name).includes(search)
  );
}

function findSpells(search) {
  return SPELL_LIST.filter(spell => isSpellMatch(spell, search)).slice(
    0,
    MAX_RESULTS
  );
}

function isItemMatch(itemBuilder, search) {
  return itemBuilder().name?.includes(search);
}

function findEquipment(search) {
  return getAllItems()
    .filter(itemBuilder => isItemMatch(itemBuilder, search))
    .map(i => i?.())
    .slice(0, MAX_RESULTS);
}

export function getSearchResults(search) {
  if (!search)
    return {
      spells: [],
      equipment: [],
    };

  return {
    spells: findSpells(search),
    equipment: findEquipment(search),
  };
}
