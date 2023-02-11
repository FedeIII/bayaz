import { EXPLORER_PACK } from './adventure';
import { WEAPONS } from './weapons';

export function translateEquipment(type) {
  switch (type) {
    case 'weapon':
      return 'Arma';

    default:
      break;
  }
}

export function getAllItems() {
  return Object.values({ ...EXPLORER_PACK.items, ...WEAPONS });
}

export function pcItem(itemName, itemAmount) {
  const item = getAllItems().find(item => item().name === itemName)();

  return { name: item.name, amount: itemAmount || 1 };
}
