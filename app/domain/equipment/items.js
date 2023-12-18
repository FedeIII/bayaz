import { isServer } from '~/utils/isServer';
import { ARMORS } from './armors';
import { WEAPONS } from './weapons';
import { getItemByName, getItems } from '~/services/item.server';
import { isAmmo } from './equipment';

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
  common: '50-100 po',
  uncommon: '101-500 po',
  rare: '501-5.000 po',
  veryRare: '5.001-50.000 po',
  legendary: '>50.000 po',
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

    return props => itemBuilder({ ...magicItemProps, ...props });
  });
}

export const magicItemsStore = {
  itemMap: new Map(),
  items: [],

  set(items) {
    this.items = items;

    for (let item of items) {
      this.itemMap.set(item().name, item);
    }
  },

  getSync(itemName) {
    if (typeof process !== 'undefined') {
      console.error(
        'magicItemsStore.getSync is intended for the browser store, use async magicItemsStore.get in the server'
      );

      return null;
    }

    return this.itemMap.get(itemName);
  },

  async get(itemName) {
    if (isServer()) {
      return await getItemByName(itemName);
    }

    return Promise.resolve(this.itemMap.get(itemName));
  },

  getAllSync() {
    if (typeof process !== 'undefined') {
      console.error(
        'magicItemsStore.getAllSync is intended for the browser store, use async magicItemsStore.getAll in the server'
      );

      return [];
    }

    return this.items;
  },

  async getAll() {
    if (isServer()) {
      return await getItems();
    }

    return Promise.resolve(this.items);
  },
};

export function isEquipmentItem(item) {
  return isAmmo(item) || item.category === 'scroll';
}
