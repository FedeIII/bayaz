import { Fragment } from 'react';
import {
  translateCriminalSpecialty,
  translateFavoriteScheme,
  translateGuild,
  translateOutlanderOrigin,
  translateRoutine,
  translateSageSpecialty,
  translateSoldierSpecialty,
} from './backgrounds/backgrounds';
import {
  getAttackBonus,
  getDamageBonus,
  getDamageDice,
  getItemArmorClass,
  getStat,
  getStatMod,
  hasToImproveAbilityScore,
  translateClass,
  translateSavingThrowStatus,
} from './characters';
import {
  getAllHeavyArmors,
  getAllLightArmors,
  getAllMediumArmors,
} from './equipment/armors';
import { getItem, noItem } from './equipment/equipment';
import {
  getAllMartialMelee,
  getAllMartialRanged,
  getAllSimpleMelee,
  getAllSimpleRanged,
  translateDamage,
} from './equipment/weapons';
import { displayBardTrait } from './classes/bard/displayBardTrait';
import { displayBarbarianTrait } from './classes/barbarian/displayBarbarianTrait';
import { displayWarlockTrait } from './classes/warlock/displayWarlockTrait';
import { displayClericTrait } from './classes/cleric/displayClericTrait';
import { displayDruidTrait } from './classes/druid/displayDruidTrait';
import { displayRangerTrait } from './classes/ranger/displayRangerTrait';
import { displayFighterTrait } from './classes/fighter/displayFighterTrait';
import { displaySorcererTrait } from './classes/sorcerer/displaySorcererTrait';
import { displayWizardTrait } from './classes/wizard/displayWizardTrait';
import { displayMonkTrait } from './classes/monk/displayMonkTrait';
import { displayPaladinTrait } from './classes/paladin/displayPaladinTrait';
import { displayRogueTrait } from './classes/rogue/displayRogueTrait';
import { isMonkWeapon } from './classes/monk/monk';
import {
  getSorcererOrigin,
  isDraconicBloodline,
  translateSorcererOrigin,
} from './classes/sorcerer/sorcerer';
import {
  getFightingStyle,
  translateFightingStyle,
} from './classes/fighter/fighter';
import { getPaladinFightingStyle } from './classes/paladin/paladin';
import {
  getRangerFightingStyle,
  translateRangerFightingStyle,
} from './classes/ranger/ranger';
import { t } from './translations';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const noOp = () => {};

export function increment(num) {
  return num >= 0 ? '+' + num : num;
}

export function signed(num) {
  return num > 0 ? '+' + num : num;
}

export function listItems(items) {
  return (
    items
      .map(item => (item.amount > 1 ? item.amount + 'x ' : '') + t(item.name))
      .join(', ') + '.'
  );
}

export function ItemWithInfo(props) {
  const { item } = props;
  let info = itemWithAmount(item.translation, item.amount);

  let propsInfo = null;
  if (item.properties) {
    propsInfo = Object.keys(item.properties)
      .map(prop => t(prop))
      .filter(translation => translation !== 'Unknown translation')
      .join(', ');
  }

  return (
    <span className="tooltip">
      {info}
      {!!propsInfo && <span className="tooltiptext">{propsInfo}</span>}
    </span>
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

export function displayDamage(pc, weapon, weaponIndex) {
  const { properties: { versatile } = {} } = weapon;
  const damageDice = getDamageDice(pc, weapon);
  const damageBonus = getDamageBonus(pc, weapon, weaponIndex);
  const bonusOperator = damageBonus > 0 ? '+' : '';

  if (versatile)
    if (damageBonus)
      return `${damageDice} (${versatile}) ${bonusOperator} ${damageBonus}`;
    else return `${damageDice} (${versatile})`;
  if (damageBonus) return `${damageDice} ${bonusOperator} ${damageBonus}`;
  else return `${damageDice}`;
}

function getAttackFromWeapon(pc, weapon, specialAttackIndex, weaponIndex) {
  return weapon?.name
    ? {
        weapon: getItem(weapon.name),
        specialAttackIndex,
        bonus: getAttackBonus(pc, weapon, weaponIndex),
        damage: displayDamage(pc, weapon, weaponIndex),
        type: `(${translateDamage(weapon.damage[1])})`,
      }
    : {
        weapon: noItem(),
        specialAttackIndex: null,
        bonus: null,
        damage: null,
        type: null,
      };
}

export function getAttacks(pc) {
  const {
    items: { weapons },
  } = pc;

  let specialAttackIndex = 0;
  let weaponSlots = [...weapons, noItem(), noItem(), noItem()];
  weaponSlots = weaponSlots.slice(0, 3).map(w => w || noItem());
  return weaponSlots.reduce((attacks, pWeapon, weaponIndex) => {
    const weapon = getItem(pWeapon.name);

    attacks.push(
      getAttackFromWeapon(
        pc,
        weapon,
        hasSpecialAttack(weapon, pc) && ++specialAttackIndex,
        weaponIndex
      )
    );

    return attacks;
  }, []);
}

function hasSpecialAttack(weapon, pc) {
  if (!weapon) return null;

  const { properties } = weapon;
  const { pClass } = pc;

  return !!(
    (properties &&
      (properties.thrown ||
        properties.reach ||
        properties.twoHanded ||
        properties.loading ||
        properties.ammunition ||
        properties.special ||
        properties.light ||
        properties.heavy ||
        properties.finesse ||
        properties.versatile)) ||
    (pClass === 'monk' && isMonkWeapon(weapon))
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
  const { pClass } = pc;

  const components = [];

  if (pClass === 'monk' && isMonkWeapon(weapon)) {
    components.push(<Fragment key="monk-weapon">Arma de monje. </Fragment>);
  }

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
  const {
    items: { weapons },
  } = pc;

  return weapons.reduce((specialAttacks, pWeapon) => {
    pWeapon = pWeapon || noItem();
    const weapon = getItem(pWeapon.name);
    if (hasSpecialAttack(weapon, pc)) {
      specialAttacks.push(
        <SpecialAttackFromWeapon pc={pc} weapon={weapon} key={weapon.name} />
      );
    }

    return specialAttacks;
  }, []);
}

function displayClassTrait(traitName, trait, pc) {
  const classTrait = (
    {
      barbarian: displayBarbarianTrait,
      bard: displayBardTrait,
      warlock: displayWarlockTrait,
      cleric: displayClericTrait,
      druid: displayDruidTrait,
      ranger: displayRangerTrait,
      fighter: displayFighterTrait,
      sorcerer: displaySorcererTrait,
      wizard: displayWizardTrait,
      monk: displayMonkTrait,
      paladin: displayPaladinTrait,
      rogue: displayRogueTrait,
    }[pc.pClass] || noOp
  )(traitName, trait, pc);

  return classTrait;
}

export function displayTrait(traitName, trait, pc) {
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

    // BACKGROUNDS
    case 'guildMembership':
      return (
        <Fragment>
          <u>Artesano Gremial:</u> {trait}.
          {!!pc.background?.guild
            ? ` Gremio de ${translateGuild(pc.background.guild)}`
            : ''}
        </Fragment>
      );

    case 'byPopularDemand':
      return (
        <Fragment>
          <u>Artista:</u> {trait}.
          {!!pc.background?.routines?.length ? (
            <>
              {' '}
              <u>Especialidades:</u>{' '}
              {pc.background.routines.map(translateRoutine).join(', ')}
            </>
          ) : (
            ''
          )}
        </Fragment>
      );

    case 'falseIdentity':
      return (
        <Fragment>
          <u>{trait}.</u>
          {!!pc.background?.favoriteScheme
            ? ` Estafa: ${translateFavoriteScheme(
                pc.background.favoriteScheme
              )}`
            : ''}
        </Fragment>
      );

    case 'criminalContact':
      return (
        <Fragment>
          <u>{trait}.</u>
          {!!pc.background?.criminalSpecialty
            ? ` Especialidad Criminal: ${translateCriminalSpecialty(
                pc.background.criminalSpecialty
              )}`
            : ''}
        </Fragment>
      );

    case 'wanderer':
      return (
        <Fragment>
          <u>{trait}.</u>
          {!!pc.background?.outlanderOrigin
            ? ` Origen: ${translateOutlanderOrigin(
                pc.background.outlanderOrigin
              )}`
            : ''}
        </Fragment>
      );

    case 'researcher':
      return (
        <Fragment>
          <u>{trait}.</u>
          {!!pc.background?.sageSpecialty
            ? ` Especialidad: ${translateSageSpecialty(
                pc.background.sageSpecialty
              )}`
            : ''}
        </Fragment>
      );

    case 'militaryRank':
      return (
        <Fragment>
          <u>{trait}.</u>
          {!!pc.background?.soldierSpecialty
            ? ` Especialidad: ${translateSoldierSpecialty(
                pc.background.soldierSpecialty
              )}`
            : ''}
        </Fragment>
      );
    // BACKGROUNDS

    case 'newSpells':
      return (
        <>
          <strong>{trait}</strong>
          <span className="sheet__pending-trait">(!)</span>
        </>
      );

    case 'abilityScoreImprovement':
      if (!hasToImproveAbilityScore(pc)) {
        return null;
      }
      return (
        <>
          <strong>{trait}</strong>
          <span className="sheet__pending-trait">(!)</span>
        </>
      );

    case 'levelUp':
      return (
        <>
          <strong>{trait}</strong>
          <span className="sheet__pending-trait">(!)</span>
        </>
      );

    default:
  }

  const classDisplay = displayClassTrait(traitName, trait, pc);
  if (classDisplay) return classDisplay;
  else if (classDisplay === false) return null;

  return trait;
}

export function displayTotalHitPointsRolls(pc) {
  const { totalHitPoints } = pc;
  const [
    lastRoll,
    oneToLastRoll,
    twoToLastRoll,
    threeToLastRoll,
    ...restRolls
  ] = totalHitPoints.slice().reverse();
  let rolls = restRolls.length ? '... + ' : '';
  if (threeToLastRoll) rolls += `${threeToLastRoll} + `;
  if (twoToLastRoll) rolls += `${twoToLastRoll} + `;
  if (oneToLastRoll) rolls += `${oneToLastRoll} + `;
  if (lastRoll) rolls += lastRoll;
  return rolls;
}

export function getAcBreakdown(pc) {
  const {
    items: {
      equipment: { armor: pArmor = {}, shield: pShield = {} },
    },
    pClass,
  } = pc;

  const armor = pArmor && getItem(pArmor.name);
  const shield = pShield && getItem(pShield.name);

  const acBreakdown =
    pClass === 'barbarian' && !armor
      ? {
          title: `${translateClass(pClass)} (sin armadura)`,
          base: 10,
          extras: [
            { title: 'DEX', ac: increment(getStatMod(getStat(pc, 'dex'))) },
            { title: 'CON', ac: increment(getStatMod(getStat(pc, 'con'))) },
          ],
        }
      : pClass === 'monk' && !armor && !shield
      ? {
          title: `${translateClass(pClass)} (sin armadura ni escudo)`,
          base: 10,
          extras: [
            { title: 'WIS', ac: increment(getStatMod(getStat(pc, 'wis'))) },
            { title: 'DEX', ac: increment(getStatMod(getStat(pc, 'dex'))) },
          ],
        }
      : pClass === 'sorcerer' && isDraconicBloodline(pc) && !armor && !shield
      ? {
          title: `${translateSorcererOrigin(
            getSorcererOrigin(pc)
          )} (sin armadura ni escudo)`,
          base: 13,
          extras: [
            { title: 'DEX', ac: increment(getStatMod(getStat(pc, 'dex'))) },
          ],
        }
      : armor
      ? {
          title: 'Armadura',
          base: getItemArmorClass(pc, armor.name),
          extras: [
            ...(pClass === 'fighter' && getFightingStyle(pc) === 'defense'
              ? [
                  {
                    title: `Estilo de Combate: ${translateFightingStyle(
                      getFightingStyle(pc)
                    )}`,
                    ac: increment(1),
                  },
                ]
              : []),
            ...(pClass === 'ranger' && getRangerFightingStyle(pc) === 'defense'
              ? [
                  {
                    title: `Estilo de Combate: ${translateRangerFightingStyle(
                      getRangerFightingStyle(pc)
                    )}`,
                    ac: increment(1),
                  },
                ]
              : []),
            ...(pClass === 'paladin' &&
            getPaladinFightingStyle(pc) === 'defense'
              ? [
                  {
                    title: `Estilo de Combate: ${translateFightingStyle(
                      getPaladinFightingStyle(pc)
                    )}`,
                    ac: increment(1),
                  },
                ]
              : []),
          ],
        }
      : {
          title: 'Sin armadura',
          base: 10,
          extras: [
            { title: 'DEX', ac: increment(getStatMod(getStat(pc, 'dex'))) },
          ],
        };

  if (shield) {
    acBreakdown.extras.push({ title: 'Escudo', ac: `(+2)` });
  }

  return acBreakdown;
}
