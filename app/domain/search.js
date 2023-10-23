import { getAllItems, translateItem } from './equipment/equipment';
import { SPELL_LIST } from './spells/spellList';
import { translateSpell } from './spells/spells';

export const MAX_RESULTS = 20;

function isSpellMatch(spell, search) {
  return [spell.name, translateSpell(spell.name)].some(str =>
    str.includes(search)
  );
}

function findSpells(search) {
  return SPELL_LIST.filter(spell => isSpellMatch(spell, search)).slice(
    0,
    MAX_RESULTS
  );
}

function isItemMatch(itemBuilder, search) {
  const item = itemBuilder();
  return [
    item.name,
    item.translation,
    item.type,
    item.subtype,
    item.damage?.[1],
    translateItem(item.subtype),
  ].some(str => str?.toLowerCase().includes(search));
}

function findEquipment(search) {
  return getAllItems()
    .filter(itemBuilder => isItemMatch(itemBuilder, search))
    .map(i => i?.())
    .slice(0, MAX_RESULTS);
}

export function getSearchResults(search) {
  const lowercaseSearch = search?.toLowerCase();
  if (!search)
    return {
      spells: [],
      equipment: [],
    };

  return {
    spells: findSpells(lowercaseSearch),
    equipment: findEquipment(lowercaseSearch),
  };
}
