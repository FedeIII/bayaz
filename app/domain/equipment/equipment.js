import { PACKS, getAllPackItems } from './packs';
import { WEAPONS } from './weapons';
import { TOOLS } from './tools';
import { ARMORS } from './armors';
import { BARBARIAN_EQUIPMENT } from '../classes/barbarian/barbarian';
import { BARD_EQUIPMENT } from '../classes/bard/bard';
import { WARLOCK_EQUIPMENT } from '../classes/warlock/warlock';
import { CLERIC_EQUIPMENT } from '../classes/cleric/cleric';
import { DRUID_EQUIPMENT } from '../classes/druid/druid';
import { RANGER_EQUIPMENT } from '../classes/ranger/ranger';
import { FIGHTER_EQUIPMENT } from '../classes/fighter/fighter';
import { SORCERER_EQUIPMENT } from '../classes/sorcerer/sorcerer';
import { WIZARD_EQUIPMENT } from '../classes/wizard/wizard';
import { MONK_EQUIPMENT } from '../monk';
import { PALADIN_EQUIPMENT } from '../paladin';
import { ROGUE_EQUIPMENT } from '../rogue';

export function translateEquipment(type) {
  switch (type) {
    case 'weapon':
      return 'Arma';
    case 'adventure':
      return 'Equipo de aventura';
    case 'armor':
      return 'Armadura';
    case 'tool':
      return 'Herramienta';

    default:
      return 'unknown equipment type';
  }
}

export function getItem(itemName) {
  const allItems = getAllItems();
  const itemBuilder = allItems.find(item => item().name === itemName);

  if (!itemBuilder) {
    console.error('Item ' + itemName + ' not found');
    return null;
  }

  return itemBuilder();
}

export function translateItem(itemName) {
  if (itemName === 'simpleWeapons') return 'Armas simples';
  if (itemName === 'simpleMelee') return 'Arma simple c/c';
  if (itemName === 'simpleRanged') return 'Arma simple a distancia';
  if (itemName === 'martialWeapons') return 'Armas marciales';
  if (itemName === 'martialMelee') return 'Arma marcial c/c';
  if (itemName === 'martialRanged') return 'Arma marcial a distancia';
  if (itemName === 'lightArmors') return 'Armaduras ligeras';
  if (itemName === 'mediumArmors') return 'Armaduras medias';
  if (itemName === 'heavyArmors') return 'Armaduras pesadas';
  if (itemName === 'light') return 'Armadura ligera';
  if (itemName === 'medium') return 'Armadura media';
  if (itemName === 'heavy') return 'Armadura pesada';

  const item = getItem(itemName);

  if (item) return item.translation;

  return null;
}

export function getAllItems() {
  return Object.values({
    ...WEAPONS,
    ...ARMORS,
    ...TOOLS,
    ...getAllPackItems(),
  });
}

export function pcItem(itemName, itemAmount) {
  const itemBuilder = getAllItems().find(item => item().name === itemName);

  if (!itemBuilder) {
    throw new Error('Item ' + itemName + ' not found');
  }

  const item = itemBuilder();

  return { name: item.name, amount: parseInt(itemAmount, 10) || 1 };
}

export function translatePack(packName) {
  return PACKS.find(pack => pack.packName === packName).translation;
}

export function unifyEquipment(pcItems) {
  return pcItems.reduce((unifiedEquipment, item) => {
    const itemIndex = unifiedEquipment.findIndex(i => i.name === item.name);
    if (itemIndex >= 0) unifiedEquipment[itemIndex].amount += item.amount;
    else unifiedEquipment.push({ ...item });
    return unifiedEquipment;
  }, []);
}

export function canBeAlwaysEquipped(item) {
  const { subtype } = item;
  return (
    subtype === 'clothes' ||
    subtype === 'arcaneFocus' ||
    subtype === 'druidicFocus' ||
    subtype === 'equipment'
  );
}

export const CLASS_EQUIPMENT = {
  barbarian: BARBARIAN_EQUIPMENT,
  bard: BARD_EQUIPMENT,
  warlock: WARLOCK_EQUIPMENT,
  cleric: CLERIC_EQUIPMENT(),
  druid: DRUID_EQUIPMENT,
  ranger: RANGER_EQUIPMENT,
  fighter: FIGHTER_EQUIPMENT,
  sorcerer: SORCERER_EQUIPMENT,
  wizard: WIZARD_EQUIPMENT,
  monk: MONK_EQUIPMENT,
  paladin: PALADIN_EQUIPMENT,
  rogue: ROGUE_EQUIPMENT,
};
