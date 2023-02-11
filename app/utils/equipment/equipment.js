import { EXPLORER_PACK, getExplorerPackItems } from './adventure';
import { WEAPONS } from './weapons';

export function translateEquipment(type) {
  switch (type) {
    case 'weapon':
      return 'Arma';

    default:
      return 'unknown equipment type';
  }
}

export function translateItem(itemName) {
  const item = getAllItems().find(item => item().name === itemName)();

  return item.translation;
}

export function getAllItems() {
  return Object.values({ ...EXPLORER_PACK.items, ...WEAPONS });
}

export function pcItem(itemName, itemAmount) {
  const item = getAllItems().find(item => item().name === itemName)();

  return { name: item.name, amount: itemAmount || 1 };
}

export function getPackItems(packName) {
  switch (packName) {
    case 'explorer-pack':
      return getExplorerPackItems();

    default:
      return [];
  }
}
