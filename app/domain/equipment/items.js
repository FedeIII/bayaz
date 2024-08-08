import { ARMORS } from './armors';
import { WEAPONS } from './weapons';
import { isAmmo, isArmor, isShield, isWeapon } from './equipment';
import { itemWithAmount } from '../display';
import { t } from '../translations';

export const ITEM_RARITY = [
  'common',
  'uncommon',
  'rare',
  'veryRare',
  'legendary',
];

export const ITEM_CATEGORY = [
  'ring',
  'armor',
  'weapon',
  'staff',
  'wondrous',
  'scroll',
  'potion',
  'rod',
  'wand',
];

const ITEM_APROX_PRICES = {
  common: '50-100 Oro',
  uncommon: '101-500 Oro',
  rare: '501-5.000 Oro',
  veryRare: '5.001-50.000 Oro',
  legendary: '>50.000 Oro',
};

function getMagicItemProps(magicItem) {
  return {
    ...magicItem,
    aproxPrice: ITEM_APROX_PRICES[magicItem.rarity],
    translation: magicItem.name,
  };
}

export function parseMagicItems(magicItems) {
  return magicItems.map(magicItem => {
    const magicItemProps = getMagicItemProps(magicItem);

    let itemBuilder = p => p;

    if (magicItem.category === 'weapon') {
      itemBuilder = WEAPONS()[magicItem.subcategory];
    }

    if (magicItem.category === 'armor') {
      itemBuilder = ARMORS()[magicItem.subcategory];
    }

    if (magicItem.category === 'staff') {
      itemBuilder = WEAPONS().quarterstaff;
    }

    return props => itemBuilder({ ...magicItemProps, ...props });
  });
}

export function isEquipmentItem(item) {
  return (
    isAmmo(item) ||
    item.type === 'scroll' ||
    item.type === 'potion' ||
    item.type === 'locket' ||
    item.type === 'ring'
  );
}

export function hasActions(item) {
  return item.consumable || item.charges !== null;
}

export function renderItemName(item) {
  return item.unidentifiedName && !item.identified
    ? item.unidentifiedName
    : item.translation || t(item.name);
}

export function renderItemNameWithAmount(item, isDm) {
  if (isDm) {
    return itemWithAmount(item.translation || item.name, item.amount);
  }

  if (item.unidentifiedName && !item.identified) {
    return itemWithAmount(item.unidentifiedName, item.amount);
  }

  return itemWithAmount(item.translation || item.name, item.amount);
}

export function getSectionPath(item) {
  if (isWeapon(item)) {
    return 'treasure.weapons';
  }
  if (isArmor(item) || isShield(item)) {
    return 'treasure.armors';
  }
  if (isAmmo(item)) {
    return 'equipment.ammunition';
  }
  if (isEquipmentItem(item)) {
    return 'equipment.others';
  }
  return 'treasure.others';
}
