import { getChildrenText } from '~/utils/getChildrenText';
import {
  ALL_TRAITS,
  BASE_CHARACTER,
  getSkillExplanationText,
} from './characters';
import { MONSTERS } from './encounters/monsterList';
import { translateMonster } from './encounters/monsterTranslations';
import { Monster, getSpecialSkills } from './encounters/monsters';
import { getAllItems } from './equipment/equipment';
import { SPELL_LIST } from './spells/spellList';
import { translateSchool } from './spells/spellTranslations';
import { translateSpell } from './spells/spells';
import { t } from './translations';

function getSpellChildrenText(children) {
  if (!Array.isArray(children) && !children.props) return children;

  if (children.props) return getSpellChildrenText(children.props.children);

  if (Array.isArray(children))
    return children.map(getSpellChildrenText).join('. ');
}

// SPELLS //
function isSpellMatch(spell, search) {
  return [
    spell.name,
    translateSpell(spell.name),
    getSpellChildrenText(spell.desc.props.children),
    spell.school,
    translateSchool(spell.school),
  ].some(str => str?.toLowerCase().includes(search));
}

function findSpells(search) {
  return Promise.resolve(
    SPELL_LIST.filter(spell => isSpellMatch(spell, search))
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
    t(item.subtype),
  ].some(str => str?.toLowerCase().includes(search));
}

function isAllowedItem(itemBuilder, isDm) {
  if (isDm) return true;
  if (!!itemBuilder().rarity) return false;
  return true;
}

async function findEquipment(search, isDm) {
  return getAllItems()
    .filter(
      itemBuilder =>
        isItemMatch(itemBuilder, search) && isAllowedItem(itemBuilder, isDm)
    )
    .map(i => i?.());
}

// TRAITS //
function getExplanationText(traitName, trait) {
  const skillExplanation = getSkillExplanationText({
    skillName: traitName,
    skill: trait,
    pc: BASE_CHARACTER,
  });
  const text = getChildrenText(`${trait}: `, skillExplanation);
  return text;
}

function isTraitMatch(traitName, trait, search) {
  return (
    [traitName, trait].some(str => str?.toLowerCase().includes(search)) ||
    getExplanationText(traitName, trait)?.toLowerCase().includes(search)
  );
}

function findTraits(search) {
  return Promise.resolve(
    ALL_TRAITS.filter(([traitName, trait]) =>
      isTraitMatch(traitName, trait, search)
    )
  );
}

// MONSTERS
function isMonsterMatch(monsterName, search) {
  const monster = Monster(monsterName);
  const specialSkills = getSpecialSkills(monster);
  return [
    monster.name,
    translateMonster(monster.name),
    monster.tags,
    monster.type,
    t(monster.type),
    monster.tags,
    ...(monster.tags?.split(',').map(t) || []),
    ...Object.values(specialSkills),
    ...Object.values(monster.details.actions || {}),
    ...Object.values(monster.details.legendaryActions || {}),
    monster.details.senses,
    monster.details.notes,
  ].some(str => str?.toLowerCase().includes(search));
}

function findMonsters(search) {
  return Promise.resolve(
    Object.values(MONSTERS).filter(monster =>
      isMonsterMatch(monster.name, search)
    )
  );
}

const finders = {
  spells: findSpells,
  equipment: findEquipment,
  traits: findTraits,
  monsters: findMonsters,
};

const ALL_SECTIONS = ['spells', 'equipment', 'traits', 'monsters'];

export function emptySearch(sections = ALL_SECTIONS) {
  return sections.reduce((res, element) => ({ ...res, [element]: [] }), {});
}

export async function getSearchResults(
  search,
  isDm,
  searchSections = ALL_SECTIONS
) {
  if (!search) {
    return Promise.resolve(emptySearch(searchSections));
  }

  const lowercaseSearch = search?.toLowerCase();
  const searchResults = {};
  for (let element of searchSections) {
    searchResults[element] = await finders[element](lowercaseSearch, isDm);
  }

  return searchResults;
}
