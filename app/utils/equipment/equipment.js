import { PACKS, getAllPackItems } from './packs';
import { WEAPONS } from './weapons';
import { TOOLS } from './tools';
import { ARMORS } from './armors';
import { BARBARIAN_EQUIPMENT } from '../barbarian';
import { BARD_EQUIPMENT } from '../bard';
import { WARLOCK_EQUIPMENT } from '../warlock';
import { CLERIC_EQUIPMENT } from '../cleric';
import { DRUID_EQUIPMENT } from '../druid';
import { RANGER_EQUIPMENT } from '../ranger';
import { FIGHTER_EQUIPMENT } from '../fighter';
import { SORCERER_EQUIPMENT } from '../sorcerer';
import { WIZARD_EQUIPMENT } from '../wizard';
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
  return getAllItems().find(item => item().name === itemName)();
}

export function translateItem(itemName) {
  if (itemName === 'simpleWeapons') return 'Armas simples';
  if (itemName === 'martialWeapons') return 'Armas marciales';
  if (itemName === 'lightArmors') return 'Armaduras ligeras';
  if (itemName === 'mediumArmors') return 'Armaduras medias';
  if (itemName === 'heavyArmors') return 'Armaduras pesadas';

  return getItem(itemName).translation;
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
  const item = itemBuilder();

  return { name: item.name, amount: parseInt(itemAmount, 10) || 1 };
}

export function translatePack(packName) {
  return PACKS.find(pack => pack.packName === packName).translation;
}

export function unifyEquipment(pcEquipment) {
  return pcEquipment.reduce((unifiedEquipment, item) => {
    const itemIndex = unifiedEquipment.findIndex(i => i.name === item.name);
    if (itemIndex >= 0) unifiedEquipment[itemIndex].amount += item.amount;
    else unifiedEquipment.push({ ...item });
    return unifiedEquipment;
  }, []);
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
