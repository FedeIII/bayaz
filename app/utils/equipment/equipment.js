import {
  EXPLORERS_PACK,
  DIPLOMATS_PACK,
  ENTERTAINERS_PACK,
  SCHOLARS_PACK,
  DUNGEONEERS_PACK,
  getExplorersPackItems,
  getDiplomatsPackItems,
  getEntertainersPackItems,
  getScholarsPackItems,
  getDungeoneersPackItems,
} from './adventure';
import { WEAPONS } from './weapons';
import { TOOLS } from './tools';
import { ARMORS } from './armors';

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

export function translateItem(itemName) {
  const item = getAllItems().find(item => item().name === itemName)();

  return item.translation;
}

export function getAllItems() {
  return Object.values({
    ...WEAPONS,
    ...ARMORS,
    ...TOOLS,
    ...EXPLORERS_PACK.items,
    ...DIPLOMATS_PACK.items,
    ...ENTERTAINERS_PACK.items,
    ...SCHOLARS_PACK.items,
    ...DUNGEONEERS_PACK.items,
  });
}

export function pcItem(itemName, itemAmount) {
  const itemBuilder = getAllItems().find(item => item().name === itemName);
  const item = itemBuilder();

  return { name: item.name, amount: itemAmount || 1 };
}

export function getPackItems(packName) {
  switch (packName) {
    case 'explorers-pack':
      return getExplorersPackItems();
    case 'diplomats-pack':
      return getDiplomatsPackItems();
    case 'entertainers-pack':
      return getEntertainersPackItems();
    case 'scholars-pack':
      return getScholarsPackItems();
    case 'dungeoneers-pack':
      return getDungeoneersPackItems();

    default:
      return [];
  }
}

export function translatePack(packName) {
  const packs = [EXPLORERS_PACK, DIPLOMATS_PACK];

  return packs.find(pack => pack.packName === packName).translation;
}
