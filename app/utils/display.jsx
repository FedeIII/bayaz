import { Fragment } from 'react';
import {
  getAttackBonus,
  getDamageBonus,
  getStat,
  getStatMod,
  translateSavingThrowStatus,
} from './characters';
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
  translateDamage,
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

function displayDamage(pc, weapon) {
  const { properties: { versatile } = {} } = weapon;
  const damageBonus = getDamageBonus(pc, weapon);
  if (versatile)
    if (damageBonus)
      return `${weapon.damage[0]} (${versatile}) + ${damageBonus}`;
    else return `${weapon.damage[0]} (${versatile})`;
  if (damageBonus) return `${weapon.damage[0]} + ${damageBonus}`;
  else return `${weapon.damage[0]}`;
}

function getAttackFromWeapon(pc, weapon, specialAttackIndex) {
  return {
    name: weapon.translation,
    specialAttackIndex,
    bonus: getAttackBonus(pc, weapon),
    damage: displayDamage(pc, weapon),
    type: `(${translateDamage(weapon.damage[1])})`,
  };
}

export function getAttacks(pc) {
  const { equipment } = pc;

  let specialAttackIndex = 0;
  return equipment.reduce((attacks, pcItem) => {
    const item = getItem(pcItem.name);
    if (item.type === 'weapon' && attacks.length < 3) {
      attacks.push(
        getAttackFromWeapon(
          pc,
          item,
          hasSpecialAttack(item) && ++specialAttackIndex
        )
      );
    }

    return attacks;
  }, []);
}

function hasSpecialAttack(weapon) {
  const { properties } = weapon;
  return !!(
    properties &&
    (properties.thrown ||
      properties.reach ||
      properties.twoHanded ||
      properties.loading ||
      properties.ammunition ||
      properties.special ||
      properties.light ||
      properties.heavy ||
      properties.finesse ||
      properties.versatile)
  );
}

function SpecialAttackFromWeapon(props) {
  const { pc, weapon } = props;
  const {
    properties: {
      thrown,
      reach,
      twoHanded,
      loading,
      ammunition,
      special,
      light,
      heavy,
      finesse,
      versatile,
    } = {},
  } = weapon;

  const components = [];

  if (thrown)
    components.push(
      <Fragment key="throw">
        Puedes lanzar esta arma {<u>{thrown[0] + 'm'}</u>}, o hasta{' '}
        {<u>{thrown[1] + 'm'}</u>} con desventaja en la tirada de ataque.{' '}
      </Fragment>
    );

  if (reach)
    components.push(
      <Fragment key="reach">Tu alcance aumenta en 1.5m. </Fragment>
    );

  if (twoHanded)
    components.push(
      <Fragment key="twoHanded">Requiere de dos manos. </Fragment>
    );

  if (loading)
    components.push(<Fragment key="loading">Requiere recarga. </Fragment>);

  if (ammunition)
    components.push(
      <Fragment key="ammunition">
        Puedes disparar con esta arma {<u>{ammunition[0] + 'm'}</u>}, o hasta{' '}
        {<u>{ammunition[1] + 'm'}</u>} con desventaja en la tirada de ataque.
        Gastas una pieza de munición.{' '}
      </Fragment>
    );

  if (special) components.push(<Fragment key="special">Especial. </Fragment>);

  if (light)
    components.push(
      <Fragment key="light">Ligera (Atacar con dos armas). </Fragment>
    );

  if (heavy) components.push(<Fragment key="heavy">Pesada. </Fragment>);

  if (finesse)
    components.push(
      <Fragment key="finesse">Sutil (Str o Dex bonus). </Fragment>
    );

  if (versatile)
    components.push(
      <Fragment key="versatile">Versátil (una o dos manos). </Fragment>
    );

  return components;
}

export function getSpecialAttacks(pc) {
  const { equipment } = pc;

  return equipment.reduce((specialAttacks, pcItem) => {
    const item = getItem(pcItem.name);
    if (item.type === 'weapon' && hasSpecialAttack(item)) {
      specialAttacks.push(
        <SpecialAttackFromWeapon pc={pc} weapon={item} key={item.name} />
      );
    }

    return specialAttacks;
  }, []);
}

export function displayTrait(traitName, trait, pc) {
  let times;

  switch (traitName) {
    case 'savingThrows':
      return Object.entries(trait).map(([salvation, status]) => (
        <Fragment key={salvation}>
          <u>{translateSavingThrowStatus(status)}</u> en las tiradas de
          salvación contra <u>{translateDamage(salvation)}</u>
        </Fragment>
      ));

    case 'resistances':
      return trait.map(damage => (
        <Fragment key={damage}>
          Resistencia contra <u>{translateDamage(damage)}</u>
        </Fragment>
      ));

    case 'darkvision':
      return `Visión en la oscuridad (${trait}m)`;

    case 'trance':
      return 'Trance';

    case 'bardicInspiration':
      return (
        <Fragment>
          <u>Inspiración de Bardo:</u> {getStatMod(getStat(pc, 'cha'))} veces al
          día. {trait}
        </Fragment>
      );

    case 'warCleric':
      times = getStatMod(getStat(pc, 'wis'));
      return (
        <Fragment>
          <u>{trait}.</u> {times > 0 ? times : 1} veces al día.
        </Fragment>
      );

    case 'wardingFlare':
      times = getStatMod(getStat(pc, 'wis'));
      return (
        <Fragment>
          <u>{trait}.</u> {times > 0 ? times : 1} veces al día.
        </Fragment>
      );

    case 'wrathOfTheStorm':
      times = getStatMod(getStat(pc, 'wis'));
      return (
        <Fragment>
          <u>{trait}.</u> {times > 0 ? times : 1} veces al día.
        </Fragment>
      );

    case 'blessingOfTheTrickster':
      return (
        <Fragment>
          <u>{trait}.</u> Dura 1 hora.
        </Fragment>
      );

    case 'discipleOfLife':
      return (
        <Fragment>
          <u>{trait}.</u> Conjuros de sanación curan un extra de (2 + nivel del
          conjuro).
        </Fragment>
      );

    case 'secondWind':
      return (
        <Fragment>
          <u>{trait}.</u> Recupera 1d10 + {pc.level} al día como acción
          adicional.
        </Fragment>
      );

    default:
      return trait;
  }
}
