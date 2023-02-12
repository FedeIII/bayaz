import { PACKS, getAllPackItems } from './packs';
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
