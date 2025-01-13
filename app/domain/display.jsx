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
  getDamageBonus,
  getDamageDice,
  getStat,
  getStatMod,
  getStats,
  getTotalAttackBonus,
  getAttackExtraBonus,
  hasToImproveAbilityScore,
  translateClass,
  translateSavingThrowStatus,
  getItemExtraArmorClass,
  getItemBaseArmorClass,
  getProficiencyBonus,
} from './characters';
import { getItem, noItem } from './equipment/equipment';
import { WEAPONS, isMeleeWeapon, translateDamage } from './equipment/weapons';
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
import { getFightingStyle } from './classes/fighter/fighter';
import { getPaladinFightingStyle } from './classes/paladin/paladin';
import { getRangerFightingStyle } from './classes/ranger/ranger';
import { t } from './translations';
import { ChooseTrait } from '~/components/summary/skillStates';
import { renderItemNameWithAmount } from './equipment/items';
import { displayFeat, hasFeat } from './feats/featUtils';
import { removeItem, unique } from '~/utils/array';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const noOp = () => {};

export function increment(num) {
  return num >= 0 ? '+' + num : num.toString();
}

export function signed(num) {
  return num > 0 ? '+' + num : num.toString();
}

export function listItems(items) {
  return (
    items
      .map(item => (item.amount > 1 ? item.amount + 'x ' : '') + t(item.name))
      .join(', ') + '.'
  );
}

export function ItemWithInfo(props) {
  const { item, pc } = props;
  let propsInfo = '';

  if (item.damage) {
    propsInfo += `${item.damage[0]} ${t(item.damage[1])}`;
  }

  if (item.damage && item.properties) {
    propsInfo += ', ';
  }

  if (item.properties) {
    propsInfo += Object.entries(item.properties)
      .map(([propName, propValue]) => {
        if (typeof propValue === 'function') {
          return `${t(propName)}: ${propValue(getStats(pc))}`;
        }
        if (typeof propValue !== 'boolean') {
          return `${t(propName)}: ${propValue}`;
        }
        return t(propName);
      })
      .join(', ');
  }

  return (
    <span className="tooltip">
      {renderItemNameWithAmount(item)}
      {!!propsInfo && <span className="tooltiptext">{propsInfo}</span>}
    </span>
  );
}

export function itemWithAmount(translation, amount) {
  return (amount > 1 ? amount + 'x ' : '') + translation;
}

function hasAllSimpleWeapons(itemNames) {
  return (
    itemNames.includes('simpleMeleeWeapons') &&
    itemNames.includes('simpleRangedWeapons')
  );
}

function hasAllMartialWeapons(itemNames) {
  return (
    itemNames.includes('martialMeleeWeapons') &&
    itemNames.includes('martialRangedWeapons')
  );
}

function hasAllLightArmors(itemNames) {
  return itemNames.includes('lightArmors');
}

function hasAllMediumArmors(itemNames) {
  return itemNames.includes('mediumArmors');
}

export function hasAllHeavyArmors(itemNames) {
  return itemNames.includes('heavyArmors');
}

export function getItemDisplayList(itemNames) {
  let list = [];
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
    includedSets.push('light');
  }

  if (hasAllMediumArmors(itemNames)) {
    includedSets.push('medium');
  }

  if (hasAllHeavyArmors(itemNames)) {
    includedSets.push('heavy');
  }

  itemNames.forEach(itemName => {
    if (!includedSets.includes(getItem(itemName).subtype)) {
      list.push(itemName);
    }
  });

  if (
    list.includes('simpleMeleeWeapons') &&
    list.includes('simpleRangedWeapons') &&
    list.includes('simpleWeapons')
  ) {
    list = removeItem(e => e === 'simpleMeleeWeapons', list);
    list = removeItem(e => e === 'simpleRangedWeapons', list);
  }

  if (
    list.includes('martialMeleeWeapons') &&
    list.includes('martialRangedWeapons') &&
    list.includes('martialWeapons')
  ) {
    list = removeItem(e => e === 'martialMeleeWeapons', list);
    list = removeItem(e => e === 'martialRangedWeapons', list);
  }

  if (
    list.includes('lightArmors') &&
    list.includes('mediumArmors') &&
    list.includes('heavyArmors')
  ) {
    list = removeItem(e => e === 'lightArmors', list);
    list = removeItem(e => e === 'mediumArmors', list);
    list = removeItem(e => e === 'heavyArmors', list);

    list.push('allArmors');
  }

  return unique(list);
}

export function displayDamage(pc, weapons, weapon, weaponIndex) {
  const { properties: { versatile } = {} } = weapon;
  const damageDice = getDamageDice(pc, weapon);
  const [baseDamageBonus, magicBonus] = getDamageBonus(
    pc,
    weapons,
    weapon,
    weaponIndex
  );
  const damageBonus = baseDamageBonus + magicBonus;
  const extraDamageBonus = getAttackExtraBonus(pc, weapon);
  const bonusOperator = damageBonus >= 0 ? '+' : '';
  const extraBonusOperators = extraDamageBonus.map(([_, bonus]) =>
    damageBonus + bonus >= 0 ? '+' : ''
  );

  const extraBonusString = extraDamageBonus.length
    ? `(${extraDamageBonus
        .map(([_, bonus], i) => extraBonusOperators[i] + (damageBonus + bonus))
        .join(', ')})`
    : '';

  if (versatile)
    if (damageBonus || extraBonusString)
      return `${damageDice} (${versatile}) ${bonusOperator}${damageBonus} ${extraBonusString}`;
    else return `${damageDice} (${versatile})`;
  if (damageBonus || extraBonusString)
    return `${damageDice} ${bonusOperator}${damageBonus} ${extraBonusString}`;
  else return `${damageDice}`;
}

function getAttackFromWeapon(pc, weapons, w, specialAttackIndex, weaponIndex) {
  const pWeapon = pc.items.weapons.find(pW => pW?.name === w.name);
  const weapon = WEAPONS()[w.name]?.(pWeapon);
  return weapon?.name
    ? {
        weapon,
        specialAttackIndex,
        bonus: getTotalAttackBonus(pc, weapons, weapon, weaponIndex),
        extraBonus: getAttackExtraBonus(pc, weapon),
        damage: displayDamage(pc, weapons, weapon, weaponIndex),
        type: `(${translateDamage(weapon.damage[1])})`,
      }
    : {
        weapon: noItem(),
        specialAttackIndex: null,
        bonus: null,
        extraBonus: [],
        damage: null,
        type: null,
      };
}

export function getAttacks(pc, weapons = []) {
  let specialAttackIndex = 0;
  let weaponSlots = [...weapons, noItem(), noItem(), noItem()];
  weaponSlots = weaponSlots.slice(0, 3).map(w => w || noItem());
  return weaponSlots.reduce((attacks, pWeapon, weaponIndex) => {
    const weapon = getItem(pWeapon);

    attacks.push(
      getAttackFromWeapon(
        pc,
        weapons,
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
    subsubtype,
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

  if (hasFeat(pc, 'crossbowExpert') && subsubtype === 'crossbow')
    components.push(<u key="crossbowExpert">{t('crossbowExpert')}.</u>);

  if (hasFeat(pc, 'polearmMaster') && subsubtype === 'polearm')
    components.push(<u key="polearmMaster">{t('polearmMaster')}.</u>);

  if (hasFeat(pc, 'greatWeaponMaster') && heavy && isMeleeWeapon(weapon))
    components.push(<u key="greatWeaponMaster">{t('greatWeaponMaster')}.</u>);

  return components;
}

export function getSpecialAttacks(pc, weapons) {
  return weapons.reduce((specialAttacks, pWeapon) => {
    pWeapon = pWeapon || noItem();
    const weapon = getItem(pWeapon);
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
    // RACIAL
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
    // RACIAL

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
          <ChooseTrait />
        </>
      );

    case 'abilityScoreImprovement':
      if (!hasToImproveAbilityScore(pc)) {
        return null;
      }
      return (
        <>
          <strong>{trait}</strong>
          <ChooseTrait />
        </>
      );

    case 'levelUp':
      return (
        <>
          <strong>{trait}</strong>
          <ChooseTrait />
        </>
      );

    default:
  }

  const displayedFeat = displayFeat(traitName, pc);
  if (displayedFeat) return displayedFeat;
  else if (displayedFeat === false) return null;

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

  const armor = pArmor && getItem(pArmor);
  const shield = pShield && getItem(pShield);

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
          base: getItemBaseArmorClass(armor.name),
          extras: [
            ...(getItemExtraArmorClass(armor.name, pc)
              ? [
                  {
                    title: 'DEX',
                    ac:
                      increment(getItemExtraArmorClass(armor.name, pc)) +
                      (getStatMod(getStat(pc, 'dex')) >
                      getItemExtraArmorClass(armor.name, pc)
                        ? ' (max)'
                        : ''),
                  },
                ]
              : []),
            ...(pClass === 'fighter' && getFightingStyle(pc) === 'defense'
              ? [
                  {
                    title: `Estilo de Combate: ${t(getFightingStyle(pc))}`,
                    ac: increment(1),
                  },
                ]
              : []),
            ...(pClass === 'ranger' && getRangerFightingStyle(pc) === 'defense'
              ? [
                  {
                    title: `Estilo de Combate: ${t(
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
                    title: `Estilo de Combate: ${t(
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

  if (hasFeat(pc, 'defensiveDuelist')) {
    acBreakdown.extras.push({
      title: t('defensiveDuelist'),
      ac: `(+${getProficiencyBonus(pc.level)})`,
    });
  }

  return acBreakdown;
}
