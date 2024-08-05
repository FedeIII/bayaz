import { ARMORS } from './armors';
import { WEAPONS } from './weapons';
import { isAmmo } from './equipment';
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
    item.category === 'scroll' ||
    item.category === 'potion' ||
    item.category === 'wondrous' ||
    item.category === 'ring' ||
    item.category === 'rod' ||
    item.category === 'wand'
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

export function renderItemNameWithAmount(item) {
  if (item.unidentifiedName && !item.identified) {
    return itemWithAmount(item.unidentifiedName, item.amount);
  }

  return itemWithAmount(item.translation || item.name, item.amount);
}
