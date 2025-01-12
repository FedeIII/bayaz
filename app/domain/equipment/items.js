import { ARMORS } from './armors';
import { WEAPONS } from './weapons';
import { getItem, isAmmo, isArmor, isShield, isWeapon } from './equipment';
import { itemWithAmount } from '../display';
import { t } from '../translations';
import { WONDROUS } from './magicItems';

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
    item.type === 'amulet' ||
    item.type === 'ring' ||
    item.type === 'wand' ||
    item.inventory === 'equipment'
  );
}

export function hasActions(item) {
  return item.consumable || item.charges !== null;
}

export function renderItemName(item) {
  if (!item) return '';
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
  if (item.custom) {
    return 'treasure.custom';
  }
  return 'treasure.others';
}

export function hasBagOfHolding(pc) {
  return !!pc.items.treasure.others.find(
    pItem => pItem.name === 'bagOfHolding' && !!pItem.identified
  );
}

export function hasBagOfHoldingContents(pc) {
  return hasBagOfHolding(pc) && !!pc.items.treasure.bagOfHolding?.length;
}

export function getBagOfHoldingContentsWeight(pc) {
  return (
    pc.items.treasure.bagOfHolding?.reduce(
      (totalWeight, item) => totalWeight + (getItem(item).weight || 0),
      0
    ) || 0
  );
}

export function fitsInBagOfHolding(pc, item) {
  const pBag = pc.items.treasure.others.find(
    item => item.name === 'bagOfHolding'
  );
  const bag = pBag ? getItem(pBag) : WONDROUS.bagOfHolding();

  const weightLeft = bag.bonus.encumbrance - getBagOfHoldingContentsWeight(pc);
  return weightLeft >= getItem(item).weight;
}

export function getAllPcItems(pc) {
  return [
    ...pc.items.weapons,
    ...(pc.items.equipment.armor ? [pc.items.equipment.armor] : []),
    ...(pc.items.equipment.shield ? [pc.items.equipment.shield] : []),
    ...pc.items.equipment.ammunition,
    ...pc.items.equipment.others,
    ...pc.items.treasure.weapons,
    ...pc.items.treasure.armors,
    ...pc.items.treasure.others,
    ...pc.items.treasure.custom,
    ...pc.items.treasure.bagOfHolding,
  ];
}

export function getAllIdentifiedItems(pc) {
  return getAllPcItems(pc).filter(item => item?.identified);
}
