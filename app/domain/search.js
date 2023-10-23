import { ALL_TRAITS, BASE_CHARACTER, getSkillExplanation } from './characters';
import { getAllItems, translateItem } from './equipment/equipment';
import { SPELL_LIST } from './spells/spellList';
import { translateSchool } from './spells/spellTranslations';
import { translateSpell } from './spells/spells';

export const MAX_RESULTS = 20;

// SPELLS //
function isSpellMatch(spell, search) {
  return [
    spell.name,
    translateSpell(spell.name),
    spell.desc,
    spell.school,
    translateSchool(spell.school),
  ].some(str => str?.toLowerCase().includes(search));
}

function findSpells(search) {
  return SPELL_LIST.filter(spell => isSpellMatch(spell, search)).slice(
    0,
    MAX_RESULTS
  );
}

// EQUIPMENT //
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

// TRAITS //
function getChildrenText(text, reactNode) {
  return reactNode?.props
    ? Array.isArray(reactNode.props.children)
      ? reactNode.props.children.reduce(getChildrenText, text)
      : text + reactNode.props.children
    : text + reactNode;
}

function getExplanationText(traitName, trait) {
  const text = getChildrenText(
    `${trait}: `,
    getSkillExplanation(traitName, trait, BASE_CHARACTER)
  );
  return text;
}

function isTraitMatch(traitName, trait, search) {
  return (
    [traitName, trait].some(str => str?.toLowerCase().includes(search)) ||
    getExplanationText(traitName, trait)?.toLowerCase().includes(search)
  );
}

function findTraits(search) {
  return ALL_TRAITS.filter(([traitName, trait]) =>
    isTraitMatch(traitName, trait, search)
  ).slice(0, MAX_RESULTS);
}

export function getSearchResults(search) {
  const lowercaseSearch = search?.toLowerCase();
  if (!search)
    return {
      spells: [],
      equipment: [],
      traits: [],
    };

  return {
    spells: findSpells(lowercaseSearch),
    equipment: findEquipment(lowercaseSearch),
    traits: findTraits(lowercaseSearch),
  };
}
