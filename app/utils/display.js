import { getAttackBonus, getDamageBonus } from './characters';
import {
  getAllHeavyArmors,
  getAllLightArmors,
  getAllMediumArmors,
} from './equipment/armors';
import { getItem, translateItem } from './equipment/equipment';
import {
  getAllMartialMelee,
  getAllMartialRanged,
  getAllSimpleMelee,
  getAllSimpleRanged,
} from './equipment/weapons';

export function increment(num) {
  return num >= 0 ? '+' + num : num;
}

export function signed(num) {
  return num > 0 ? '+' + num : num;
}

export function listItems(items) {
  return (
    items
      .map(
        item =>
          (item.amount > 1 ? item.amount + 'x ' : '') + translateItem(item.name)
      )
      .join(', ') + '.'
  );
}

export function itemWithAmount(translation, amount) {
  return (amount > 1 ? amount + 'x ' : '') + translation;
}

function hasAllSimpleWeapons(itemNames) {
  let has = true;
  [...getAllSimpleMelee(), ...getAllSimpleRanged()].forEach(simpleWeapon => {
    if (!itemNames.find(itemName => itemName === simpleWeapon.name)) {
      has = false;
    }
  });

  return has;
}

function hasAllMartialWeapons(itemNames) {
  let has = true;
  [...getAllMartialMelee(), ...getAllMartialRanged()].forEach(martialWeapon => {
    if (!itemNames.find(itemName => itemName === martialWeapon.name)) {
      has = false;
    }
  });

  return has;
}

function hasAllLightArmors(itemNames) {
  let has = true;
  getAllLightArmors().forEach(lightArmor => {
    if (!itemNames.find(itemName => itemName === lightArmor.name)) {
      has = false;
    }
  });

  return has;
}

function hasAllMediumArmors(itemNames) {
  let has = true;
  getAllMediumArmors().forEach(mediumArmor => {
    if (!itemNames.find(itemName => itemName === mediumArmor.name)) {
      has = false;
    }
  });

  return has;
}

function hasAllHeavyArmors(itemNames) {
  let has = true;
  getAllHeavyArmors().forEach(heavyArmor => {
    if (!itemNames.find(itemName => itemName === heavyArmor.name)) {
      has = false;
    }
  });

  return has;
}

export function getItemDisplayList(itemNames) {
  const list = [];
  const includedSets = [];

  if (hasAllSimpleWeapons(itemNames)) {
    list.push('simpleWeapons');
    includedSets.push('simpleMelee', 'simpleRanged');
  }

  if (hasAllMartialWeapons(itemNames)) {
    list.push('martialWeapons');
    includedSets.push('martialMelee', 'martialRanged');
  }

  if (hasAllLightArmors(itemNames)) {
    list.push('lightArmors');
    includedSets.push('light');
  }

  if (hasAllMediumArmors(itemNames)) {
    list.push('mediumArmors');
    includedSets.push('medium');
  }

  if (hasAllHeavyArmors(itemNames)) {
    list.push('heavyArmors');
    includedSets.push('heavy');
  }

  itemNames.forEach(itemName => {
    if (!includedSets.includes(getItem(itemName).subtype)) {
      list.push(itemName);
    }
  });

  return list;
}

export function getAttackFromWeapon(pc, weapon) {
  return {
    name: weapon.translation,
    bonus: getAttackBonus(pc, weapon),
    type: `${weapon.damage[0]} + ${getDamageBonus(pc, weapon)} (${
      weapon.damage[1]
    })`,
  };
}

export function getAttacks(pc) {
  const { equipment } = pc;

  return equipment.reduce((attacks, pcItem) => {
    const item = getItem(pcItem.name);
    if (item.type === 'weapon' && attacks.length < 3) {
      attacks.push(getAttackFromWeapon(pc, item));
    }

    return attacks;
  }, []);
}
