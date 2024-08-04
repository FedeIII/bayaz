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
import { MONK_EQUIPMENT } from '../classes/monk/monk';
import { PALADIN_EQUIPMENT } from '../classes/paladin/paladin';
import { ROGUE_EQUIPMENT } from '../classes/rogue/rogue';

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

export function getItem(item) {
  if (!item) return null;
  if (item.description || item.translation) return item;

  const itemName = typeof item === 'string' ? item : item.name;
  const itemAmount = typeof item === 'string' ? 1 : item.amount;
  const itemWeight = typeof item === 'string' ? 0 : item.weight;

  const itemBuilder = getAllItems().find(item => item().name === itemName);

  if (!itemBuilder) {
    return {
      name: itemName,
      amount: item.amount || 1,
      weight: item.weight || 0,
      custom: true,
    };
  }

  return itemBuilder({ amount: itemAmount, weight: itemWeight });
}

export function noItem() {
  return { name: null, translation: 'no item' };
}

export function getAllItems() {
  return Object.values({
    ...WEAPONS(),
    ...ARMORS(),
    ...TOOLS(),
    ...getAllPackItems(),
    noItem,
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

export function explodeEquipment(pcItems) {
  return pcItems.reduce((explodedEquipment, item) => {
    for (let i = 1; i <= item.amount; i++) {
      explodedEquipment.push({ ...item, amount: 1 });
    }
    return explodedEquipment;
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

export function getClassEquipment(pClass) {
  return {
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
  }[pClass];
}

export function getEquippedArmor(pc) {
  return pc.items?.equipment?.armor || null;
}

export function isWeapon(item) {
  return (
    item.type === 'weapon' ||
    item.category === 'weapon' ||
    item.category === 'staff'
  );
}

export function isArmor(item) {
  return item.type === 'armor' || item.category === 'armor';
}

export function isAmmo(item) {
  return item.subtype === 'ammunition';
}
