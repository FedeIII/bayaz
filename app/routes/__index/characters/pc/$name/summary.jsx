import { json } from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useSubmit,
  useTransition,
} from '@remix-run/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  getPc,
  equipWeapons,
  updatePc,
  reorderWeapons,
  switchArmor,
} from '~/services/pc.server';
import {
  STATS,
  getStat,
  translateClass,
  translateRace,
  getStatMod,
  getProficiencyBonus,
  statSavingThrow,
  isProficientStat,
  CLASSES,
  SKILLS,
  skillCheckBonus,
  getConditionalSkills,
  getSkills,
  translateLanguage,
  getPassivePerception,
  getItemProficiencies,
  getArmorClass,
  getExtraArmorClass,
  getTraits,
  hasExtraWeapons,
  getExtraWeapons,
  getSpeed,
  getHitDice,
  hasLeveledUp,
  getChannelDivinityTraits,
  getMaxHitPoints,
} from '~/domain/characters';
import {
  getSorcererOrigin,
  translateSorcererOrigin,
  getSorcererOriginTraits,
} from '~/domain/classes/sorcerer/sorcerer';
import {
  translateDivineDomain,
  getDivineDomain,
  getClericDomainTraits,
  hasChannelDivinity,
} from '~/domain/classes/cleric/cleric';
import {
  getPrimalPath,
  getPrimalPathTraits,
  translatePrimalPath,
} from '~/domain/classes/barbarian/barbarian';
import {
  displayMoneyAmount,
  getAttacks,
  getItemDisplayList,
  getSpecialAttacks,
  increment,
} from '~/domain/display';
import { getItem, noItem, translateItem } from '~/domain/equipment/equipment';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import { translateBackground } from '~/domain/backgrounds/backgrounds';
import { InventoryItem } from '~/components/modal/inventoryItem';
import { useInventoryItems } from '~/components/modal/useInventoryItems';
import { ItemModal } from '~/components/modal/itemModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SkillModal } from '~/components/modal/skillModal';
import { useTitle } from '~/components/hooks/useTitle';
import {
  getDeltaSpells,
  hasLearnedSpellsForCurrentLevel,
} from '~/domain/spells/spells';
import {
  getBardCollege,
  getBardCollegeTraits,
  translateBardCollege,
} from '~/domain/classes/bard/bard';
import {
  getInvocations,
  getWarlockPatron,
  getWarlockPatronTraits,
  translatePatron,
} from '~/domain/classes/warlock/warlock';
import {
  getDruidCircle,
  getDruidCircleTraits,
  translateDruidCircle,
} from '~/domain/classes/druid/druid';
import {
  getRangerConclave,
  getRangerConclaveTraits,
  translateRangerConclave,
} from '~/domain/classes/ranger/ranger';
import {
  getMartialArchetype,
  getMartialArchetypeTraits,
  translateMartialArchetype,
} from '~/domain/classes/fighter/fighter';
import {
  getArcaneTradition,
  getArcaneTraditionTraits,
  translateArcaneTradition,
} from '~/domain/classes/wizard/wizard';
import {
  getMonasticTradition,
  getMonasticTraditionTraits,
  translateMonasticTradition,
} from '~/domain/classes/monk/monk';
import {
  getSacredOath,
  getSacredOathTraits,
  translateSacredOath,
} from '~/domain/classes/paladin/paladin';
import {
  getRoguishArchetype,
  getRoguishArchetypeTraits,
  translateRoguishArchetype,
} from '~/domain/classes/rogue/rogue';
import { longRest, spendHitDie } from '~/domain/characterMutations';

import styles from '~/components/sheet.module.css';
import itemStyles from '~/components/modal/inventoryItem.module.css';
import barStyles from '~/components/indicators/bar.module.css';
import spellStyles from '~/components/spells.module.css';

const noAttack = { weapon: noItem() };

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

async function equipWeaponsAction(formData) {
  const oldWeaponName = formData.get('oldWeaponName');
  const newWeaponName = formData.get('newWeaponName');
  const name = formData.get('name');

  return await equipWeapons(name, oldWeaponName, newWeaponName);
}

async function reorderWeaponsAction(formData) {
  const name = formData.get('name');
  const weaponName = formData.get('weaponName');
  const weaponSlot = formData.get('weaponSlot');

  return await reorderWeapons(name, weaponName, weaponSlot);
}

async function switchArmorAction(formData) {
  const name = formData.get('name');
  const newArmorName = formData.get('newArmorName');

  return await switchArmor(name, newArmorName);
}

async function spendHitDieAction(formData) {
  const name = formData.get('name');
  const diceAmount = formData.get('diceAmount');

  return await spendHitDie(name, parseInt(diceAmount, 10));
}

async function spendRealHitDieAction(formData) {
  const name = formData.get('name');
  const die = formData.get('die');
  const diceAmount = formData.get('diceAmount');

  return await spendHitDie(name, parseInt(diceAmount, 10), parseInt(die, 10));
}

async function longRestAction(formData) {
  const name = formData.get('name');

  return await longRest(name);
}

async function updateFreeTexts(formData) {
  const name = formData.get('name');
  const playerName = formData.get('playerName');
  const personality = formData.get('personality');
  const ideals = formData.get('ideals');
  const bonds = formData.get('bonds');
  const flaws = formData.get('flaws');

  return await updatePc({
    name,
    freeText: { playerName, personality, ideals, bonds, flaws },
  });
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const action = formData.get('action');

  let pc = null;
  if (action === 'equipWeapons') {
    pc = await equipWeaponsAction(formData);
  } else if (action === 'reorderWeapons') {
    pc = await reorderWeaponsAction(formData);
  } else if (action === 'equipArmor') {
    pc = await switchArmorAction(formData);
  } else if (action === 'spendHitDie') {
    pc = await spendHitDieAction(formData);
  } else if (action === 'spendRealHitDie') {
    pc = await spendRealHitDieAction(formData);
  } else if (action === 'longRest') {
    pc = await longRestAction(formData);
  } else {
    pc = await updateFreeTexts(formData);
  }

  return json({ pc });
};

function WeaponModalContent(props) {
  const { pc, weapon, onWeaponChange, closeModal } = props;

  function onEquipClick(e) {
    const newWeaponName = e.target.value;
    onWeaponChange(newWeaponName);
    closeModal();
  }

  return (
    <>
      <h3 className={itemStyles.actionModalTitle}>{weapon.translation}</h3>
      <span className={itemStyles.modalClose} onClick={closeModal}>
        ⨉
      </span>
      <div className={itemStyles.modalContent}>
        <ul className={itemStyles.modalOptions}>
          <li>
            Cambiar por:{' '}
            <select
              className={styles.selectAttack}
              disabled={!hasExtraWeapons(pc)}
              onChange={onEquipClick}
            >
              <option value={weapon.name}>{weapon.translation}</option>
              {getExtraWeapons(pc).map(extraWeapon => (
                <option value={extraWeapon.name} key={extraWeapon.name}>
                  {translateItem(extraWeapon.name)}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </>
  );
}

function ArmorModalContent(props) {
  const { pc, armor, onArmorChange, closeModal } = props;
  const {
    items: {
      treasure: { armors },
    },
  } = pc;

  function onEquipClick(e) {
    const newArmorName = e.target.value;
    onArmorChange(newArmorName);
    closeModal();
  }

  return (
    <>
      <h3 className={itemStyles.actionModalTitle}>{armor.translation}</h3>
      <span className={itemStyles.modalClose} onClick={closeModal}>
        ⨉
      </span>
      <div className={itemStyles.modalContent}>
        <ul className={itemStyles.modalOptions}>
          <li>
            Cambiar por:{' '}
            <select className={styles.selectAttack} onChange={onEquipClick}>
              <option value={armor.name}>{armor.translation}</option>
              {armors.map(extraArmor => (
                <option value={extraArmor.name} key={extraArmor.name}>
                  {translateItem(extraArmor.name)}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </>
  );
}

function PcSummary() {
  const { pc } = useLoaderData();
  const {
    pClass,
    name,
    race,
    subrace,
    level,
    hitPoints,
    exp,
    languages,
    items: { weapons, equipment, treasure },
    money,
    background = {},
    freeText: { playerName, personality, ideals, bonds, flaws } = {},
  } = pc;

  const [pcName, setPcName] = useState(name);
  useEffect(() => {
    setPcName(name);
  }, [name]);

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  useTitle(pcName);

  const allSkills = getSkills(pc);
  const conditionalSkills = getConditionalSkills(pc);

  const [isSubmitShown, setIsSubmitShown] = useState(false);

  function onFreeTextChange() {
    setIsSubmitShown(true);
  }

  function onFormSubmit(e) {
    setIsSubmitShown(false);
  }

  useAddMenuItems('/characters', [
    { name: pcName, url: `/characters/pc/${pcName}/summary`, level: 1 },
    {
      name: 'Inventario',
      url: `/characters/pc/${pcName}/bio`,
      level: 2,
    },
    {
      name: 'Conjuros',
      url: `/characters/pc/${pcName}/spells`,
      level: 2,
    },
  ]);

  const submit = useSubmit();

  function onWeaponChange(i) {
    return newWeaponName => {
      submit(
        {
          action: 'equipWeapons',
          name: pcName,
          oldWeaponName: weapons[i].name,
          newWeaponName,
        },
        { method: 'post' }
      );
    };
  }

  function onArmorChange(newArmorName) {
    submit(
      {
        action: 'equipArmor',
        name: pcName,
        newArmorName,
      },
      { method: 'post' }
    );
  }

  function onWeaponDrop(weaponName, weaponSlot) {
    submit(
      {
        action: 'reorderWeapons',
        name: pcName,
        weaponName,
        weaponSlot,
      },
      { method: 'post' }
    );
  }

  const [actionModalContent, setActionModalContent] = useState(null);

  const [itemRefs, setItemRefs] = useState({
    weapons: [useRef(), useRef(), useRef()],
    armor: [useRef()],
    shield: [useRef()],
    ammunition: equipment.ammunition.map(() => useRef()),
    others: equipment.others.map(() => useRef()),
  });

  const [
    itemModalContent,
    closeItemModal,
    openItemModal,
    selectedItemRef,
    setSelectedItemRef,
  ] = useInventoryItems(pc, itemRefs, actionModalContent);

  const traits = getTraits(pc);
  const primalPathTraits = getPrimalPathTraits(pc);
  const invocations = getInvocations(pc);
  const patronTraits = getWarlockPatronTraits(pc);
  const bardCollegeTraits = getBardCollegeTraits(pc);
  const divineDomainTraits = getClericDomainTraits(pc);
  const channelDivinityTraits = getChannelDivinityTraits(pc);
  const druidCircleTraits = getDruidCircleTraits(pc);
  const rangerConclaveTraits = getRangerConclaveTraits(pc);
  const martialArchetypeTraits = getMartialArchetypeTraits(pc);
  const sorcererOriginTraits = getSorcererOriginTraits(pc);
  const arcaneTradicionTraits = getArcaneTraditionTraits(pc);
  const monasticTraditionTraits = getMonasticTraditionTraits(pc);
  const sacredOathTraits = getSacredOathTraits(pc);
  const roguishArchetypeTraits = getRoguishArchetypeTraits(pc);

  const [skillRefs, setSkillRefs] = useState({
    levelUp: [useRef()],
    spells: [useRef()],
    traits: traits.map(() => useRef()),
    primalPath: primalPathTraits.map(() => useRef()),
    bardCollege: bardCollegeTraits.map(() => useRef()),
    invocations: invocations.map(() => useRef()),
    patron: patronTraits.map(() => useRef()),
    divineDomain: divineDomainTraits.map(() => useRef()),
    channelDivinity: (() => {
      const refs = channelDivinityTraits.map(() => useRef());
      refs.main = useRef();
      return refs;
    })(),
    druidCircle: druidCircleTraits.map(() => useRef()),
    martialArchetype: martialArchetypeTraits.map(() => useRef()),
    sorcererOrigin: sorcererOriginTraits.map(() => useRef()),
    arcaneTradition: arcaneTradicionTraits.map(() => useRef()),
    monasticTradition: monasticTraditionTraits.map(() => useRef()),
    sacredOath: sacredOathTraits.map(() => useRef()),
    roguishArchetype: roguishArchetypeTraits.map(() => useRef()),
    hp: [useRef()],
    remainingHitDice: [useRef()],
  });

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
    skillBigModalContent,
  ] = useSkillItems(pc, skillRefs, submit);

  const formRef = useRef(null);

  function onItemClick(itemType, itemIndex = 0) {
    return itemName => {
      const item = getItem(itemName);

      setSelectedItemRef(itemRefs[itemType][itemIndex]);

      let content;
      if (item.type === 'weapon')
        content = props => (
          <WeaponModalContent
            pc={pc}
            weapon={item}
            onWeaponChange={onWeaponChange(itemIndex)}
            closeModal={() => setActionModalContent(null)}
          />
        );
      if (item.type === 'armor')
        content = props => (
          <ArmorModalContent
            pc={pc}
            armor={item}
            onArmorChange={onArmorChange}
            closeModal={() => setActionModalContent(null)}
          />
        );

      setTimeout(() => setActionModalContent(() => content), 0);
    };
  }

  const [extraHitPoints, setExtraHitPoints] = useState(null);
  const [hitPointsState, setHitPointsState] = useState(hitPoints);
  const maxHitPoints = getMaxHitPoints(pc);
  const hitPointsStyle =
    hitPointsState < maxHitPoints / 2
      ? hitPointsState < maxHitPoints / 5
        ? barStyles.redBar
        : barStyles.orangeBar
      : barStyles.blueBar;

  function animateHitPoints(addExtraHitPoints, i) {
    setTimeout(() => {
      setHitPointsState(hitPoints - addExtraHitPoints + i);
    }, (1000 / addExtraHitPoints) * i + 1000);

    if (addExtraHitPoints === i) return;
    else animateHitPoints(addExtraHitPoints, i + 1);
  }

  function heal(extraHitPoints) {
    setTimeout(() => {
      setExtraHitPoints(null);
    }, 5000);
    setHitPointsState(hitPoints - extraHitPoints);
    setExtraHitPoints(extraHitPoints);
    animateHitPoints(parseInt(extraHitPoints, 10), 0);
  }

  useEffect(() => {
    if (window) {
      const url = new URL(window?.location.href);
      const addExtraHitPoints = url.searchParams.get('addExtraHitPoints');
      if (addExtraHitPoints) {
        heal(addExtraHitPoints);
      }
    }
  }, []);

  const [attacks, setAttacks] = useState([noAttack, noAttack, noAttack]);
  useEffect(() => {
    setAttacks(getAttacks(pc));
  }, [pc]);

  useEffect(() => {
    const addExtraHitPoints = hitPoints - hitPointsState;
    if (addExtraHitPoints > 0) {
      heal(addExtraHitPoints);
    }
  }, [hitPoints]);

  return (
    <>
      <img src="/images/sheet1.jpg" className={styles.sheetBackground} />
      <Form
        method="post"
        className={styles.summary}
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <input readOnly type="text" name="name" value={pcName} hidden />

        {/* MODALS */}
        {actionModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={() => setActionModalContent(null)}
            dropShadow
          >
            {actionModalContent}
          </ItemModal>
        )}

        {itemModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={closeItemModal}
            closeOnLeave
          >
            {itemModalContent}
          </ItemModal>
        )}

        {skillModalContent && (
          <SkillModal
            elRef={selectedSkillRef}
            formRef={formRef}
            closeModal={closeSkillModal}
          >
            {skillModalContent}
          </SkillModal>
        )}

        {skillBigModalContent && (
          <SkillModal
            elRef={selectedSkillRef}
            formRef={formRef}
            closeModal={closeSkillModal}
            bigModal
          >
            {skillBigModalContent}
          </SkillModal>
        )}

        {/* FREE TEXT SUBMIT */}
        {isSubmitShown && (
          <button
            type="submit"
            disabled={isCreating}
            className={`${styles.data} ${styles.submit}`}
          >
            Actualizar
          </button>
        )}

        {/* BASIC ATTRS */}
        <span className={`${styles.data} ${styles.name}`}>{pcName}</span>
        <span className={`${styles.data} ${styles.pClass}`}>
          {translateClass(pClass)} lvl {level}
        </span>
        <span className={`${styles.data} ${styles.background}`}>
          {translateBackground(background.name)}
        </span>
        <input
          type="text"
          className={`${styles.data} ${styles.playerName}`}
          name="playerName"
          defaultValue={playerName}
          onChange={onFreeTextChange}
        />
        <span className={`${styles.data} ${styles.race}`}>
          {translateRace(race)}
          {subrace !== 'subrace' && ' ' + translateRace(subrace)}
        </span>
        <span className={`${styles.data} ${styles.exp}`}>{exp}</span>

        {/* STATS */}
        {STATS.map(statName => (
          <Fragment key={statName}>
            <span className={`${styles.data} ${styles[statName]}`}>
              {getStat(pc, statName)}
            </span>
            <span className={`${styles.data} ${styles[`${statName}Mod`]}`}>
              {increment(getStatMod(getStat(pc, statName)))}
            </span>
          </Fragment>
        ))}
        <span className={`${styles.data} ${styles.proficiencyBonus}`}>
          {increment(getProficiencyBonus(level))}
        </span>
        {STATS.map(statName => (
          <Fragment key={statName}>
            {isProficientStat(statName, pClass) && (
              <span className={`${styles.data} ${styles[`${statName}Prof`]}`}>
                ◍
              </span>
            )}
            <span className={`${styles.data} ${styles[`${statName}Saving`]}`}>
              {increment(
                statSavingThrow(statName, getStat(pc, statName), pClass, level)
              )}
            </span>
          </Fragment>
        ))}

        {/* SKILLS */}
        {SKILLS.map(
          skill =>
            allSkills.includes(skill.name) && (
              <span
                className={`${styles.data} ${styles[`${skill.name}Prof`]}`}
                key={skill.name}
              >
                ◍
              </span>
            )
        )}
        {SKILLS.map(skill => (
          <span
            className={`${styles.data} ${styles[`${skill.name}Saving`]}`}
            key={skill.name}
          >
            {increment(skillCheckBonus(pc, skill.name))}
            {Object.keys(conditionalSkills).includes(skill.name) && (
              <span className={styles.annotation}>
                ({increment(conditionalSkills[skill.name](pc)[0])}{' '}
                {conditionalSkills[skill.name](pc)[1]})
              </span>
            )}
          </span>
        ))}

        <span className={`${styles.data} ${styles.passivePerception}`}>
          {getPassivePerception(pc)}
        </span>

        {/* COMBAT ATTRS */}
        <div className={`${styles.data} ${styles.armorClass}`}>
          {getArmorClass(pc)}
          <span className={`${styles.data} ${styles.extraArmorClass}`}>
            {getExtraArmorClass(pc)
              ? `(${increment(getExtraArmorClass(pc))})`
              : null}
          </span>
        </div>
        <span className={`${styles.data} ${styles.speed}`}>
          {getSpeed(pc)}m
        </span>
        <span className={`${styles.data} ${styles.maxHitPoints}`}>
          <SkillItem
            ref={skillRefs.hp[0]}
            traitName="maxHitPoints"
            trait="Puntos de Golpe máximos"
            pc={pc}
            openModal={openSkillModal('hp', 0)}
          />
        </span>
        <span
          className={`${styles.data} ${styles.hitPoints} ${hitPointsStyle}`}
        >
          {hitPointsState}
          {!!extraHitPoints && (
            <span className={`${styles.data} ${styles.extraHitPoints}`}>
              {increment(extraHitPoints)}
            </span>
          )}
        </span>
        <span className={`${styles.data} ${styles.hitDice}`}>
          {getHitDice(pc)}
        </span>
        <span className={`${styles.data} ${styles.remainingHitDice}`}>
          <SkillItem
            ref={skillRefs.remainingHitDice[0]}
            traitName="remainingHitDice"
            trait="Dados de golpe"
            pc={pc}
            openModal={openSkillModal('remainingHitDice', 0)}
          />
        </span>

        <div className={`${styles.data} ${styles.deathSavingThrowSuccess}`}>
          <input
            type="checkbox"
            name="savingThrowSuccess0"
            id="savingThrowSuccess0"
            value="savingThrowSuccess0"
            className={`${styles.data} ${spellStyles.preparedSpell}`}
            style={{
              left: '4px',
              top: '0px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowSuccess0"
            className={spellStyles.preparedSpellNotChecked}
            style={{
              left: '5px',
              top: '-3px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowSuccess0"
            className={spellStyles.preparedSpellChecked}
            style={{
              left: '4px',
              top: '0px',
              zIndex: 10,
            }}
          >
            ◍
          </label>
        </div>
        <div className={`${styles.data} ${styles.deathSavingThrowSuccess}`}>
          <input
            type="checkbox"
            name="savingThrowSuccess1"
            id="savingThrowSuccess1"
            value="savingThrowSuccess1"
            className={`${styles.data} ${spellStyles.preparedSpell}`}
            style={{
              left: '29px',
              top: '0px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowSuccess1"
            className={spellStyles.preparedSpellNotChecked}
            style={{
              left: '31px',
              top: '-3px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowSuccess1"
            className={spellStyles.preparedSpellChecked}
            style={{
              left: '29px',
              top: '0px',
              zIndex: 10,
            }}
          >
            ◍
          </label>
        </div>
        <div className={`${styles.data} ${styles.deathSavingThrowSuccess}`}>
          <input
            type="checkbox"
            name="savingThrowSuccess2"
            id="savingThrowSuccess2"
            value="savingThrowSuccess2"
            className={`${styles.data} ${spellStyles.preparedSpell}`}
            style={{
              left: '54px',
              top: '0px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowSuccess2"
            className={spellStyles.preparedSpellNotChecked}
            style={{
              left: '56px',
              top: '-3px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowSuccess2"
            className={spellStyles.preparedSpellChecked}
            style={{
              left: '54px',
              top: '0px',
              zIndex: 10,
            }}
          >
            ◍
          </label>
        </div>
        <div className={`${styles.data} ${styles.deathSavingThrowFailure}`}>
          <input
            type="checkbox"
            name="savingThrowFailure0"
            id="savingThrowFailure0"
            value="savingThrowFailure0"
            className={`${styles.data} ${spellStyles.preparedSpell}`}
            style={{
              left: '5px',
              top: '-7px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowFailure0"
            className={spellStyles.preparedSpellNotChecked}
            style={{
              left: '5px',
              top: '-7px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowFailure0"
            className={spellStyles.preparedSpellChecked}
            style={{
              left: '4px',
              top: '-4px',
              zIndex: 10,
            }}
          >
            ◍
          </label>
        </div>
        <div className={`${styles.data} ${styles.deathSavingThrowFailure}`}>
          <input
            type="checkbox"
            name="savingThrowFailure1"
            id="savingThrowFailure1"
            value="savingThrowFailure1"
            className={`${styles.data} ${spellStyles.preparedSpell}`}
            style={{
              left: '5px',
              top: '-7px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowFailure1"
            className={spellStyles.preparedSpellNotChecked}
            style={{
              left: '31px',
              top: '-7px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowFailure1"
            className={spellStyles.preparedSpellChecked}
            style={{
              left: '30px',
              top: '-4px',
              zIndex: 10,
            }}
          >
            ◍
          </label>
        </div>
        <div className={`${styles.data} ${styles.deathSavingThrowFailure}`}>
          <input
            type="checkbox"
            name="savingThrowFailure2"
            id="savingThrowFailure2"
            value="savingThrowFailure2"
            className={`${styles.data} ${spellStyles.preparedSpell}`}
            style={{
              left: '56px',
              top: '-7px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowFailure2"
            className={spellStyles.preparedSpellNotChecked}
            style={{
              left: '56px',
              top: '-7px',
              zIndex: 10,
            }}
          />
          <label
            htmlFor="savingThrowFailure2"
            className={spellStyles.preparedSpellChecked}
            style={{
              left: '55px',
              top: '-4px',
              zIndex: 10,
            }}
          >
            ◍
          </label>
        </div>

        {/* ATTACKS */}
        {attacks.map((attack, i) => {
          const [_1, drag] = useDrag(
            () => ({
              type: 'WEAPON',
              item: { value: attack.weapon.name },
              canDrag: () => !!attack.weapon.name,
            }),
            [attack.weapon.name]
          );

          const [_2, drop] = useDrop(
            () => ({
              accept: 'WEAPON',
              drop: item => onWeaponDrop(item.value, i),
              canDrop: () => !!attack.weapon.name,
            }),
            [attack.weapon.name]
          );

          return (
            <Fragment key={i}>
              <div className={`${styles.data} ${styles['attackName-' + i]}`}>
                <label
                  className={styles.attackHandler}
                  ref={el => {
                    drag(el);
                    drop(el);
                  }}
                >
                  <span className={styles.attackHandlerCharacter}>░</span>
                  <InventoryItem
                    ref={itemRefs.weapons[i]}
                    pItem={attack.weapon}
                    isLast
                    onItemClick={onItemClick('weapons', i)}
                    openModal={openItemModal('weapons', i)}
                    closeModal={closeItemModal}
                    className={itemStyles.centeredItem}
                    key={attack.weapon.name}
                  />
                </label>

                {!!attack.specialAttackIndex && (
                  <sup className={styles.superscript}>
                    {attack.specialAttackIndex}
                  </sup>
                )}
              </div>
              {!!attack.bonus && (
                <span
                  className={`${styles.data} ${styles['attackBonus-' + i]}`}
                >
                  {increment(attack.bonus)}
                </span>
              )}
              {!!attack.damage && (
                <span className={`${styles.data} ${styles['attackType-' + i]}`}>
                  {attack.damage}
                  <br />
                  {attack.type}
                </span>
              )}
            </Fragment>
          );
        })}
        <ul className={`${styles.data} ${styles.specialAttacks}`}>
          {getSpecialAttacks(pc).map((specialAttack, i) => (
            <li className={styles.specialAttack} key={i}>
              {specialAttack}
            </li>
          ))}
        </ul>

        {/* EQUIPMENT */}
        <ul className={`${styles.data} ${styles.equipment}`}>
          {!!equipment.armor && (
            <li>
              <u>Armadura:</u>{' '}
              <InventoryItem
                ref={itemRefs.armor[0]}
                pItem={equipment.armor}
                isLast
                onItemClick={!!treasure.armors.length && onItemClick('armor')}
                openModal={openItemModal('armor')}
                closeModal={closeItemModal}
                key={equipment.armor.name}
              />
            </li>
          )}
          {!!equipment.shield && (
            <li>
              <u>Escudo:</u>{' '}
              <InventoryItem
                ref={itemRefs.shield[0]}
                pItem={equipment.shield}
                isLast
                openModal={openItemModal('shield')}
                closeModal={closeItemModal}
                key={equipment.shield.name}
              />
            </li>
          )}
          {!!equipment.ammunition?.length && (
            <li>
              <u>Proyectiles:</u>{' '}
              {equipment.ammunition.map((ammo, i) => (
                <InventoryItem
                  ref={itemRefs.ammunition[i]}
                  pItem={ammo}
                  isLast={i === equipment.ammunition.length - 1}
                  openModal={openItemModal('ammunition', i)}
                  closeModal={closeItemModal}
                  key={ammo.name}
                />
              ))}
            </li>
          )}
          {!!equipment.others?.length && (
            <li>
              {equipment.others.map((otherItem, i) => (
                <InventoryItem
                  ref={itemRefs.others[i]}
                  pItem={otherItem}
                  isLast={i === equipment.others.length - 1}
                  openModal={openItemModal('others', i)}
                  closeModal={closeItemModal}
                  key={otherItem.name}
                />
              ))}
            </li>
          )}
        </ul>

        <div className={`${styles.data} ${styles.copper}`}>
          {displayMoneyAmount(money[2])}
        </div>
        <div className={`${styles.data} ${styles.silver}`}>
          {displayMoneyAmount(money[1])}
        </div>
        <div className={`${styles.data} ${styles.gold}`}>
          {displayMoneyAmount(money[0])}
        </div>

        {/* FREETEXT */}
        <textarea
          className={`${styles.data} ${styles.personality}`}
          name="personality"
          defaultValue={personality}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.ideals}`}
          name="ideals"
          defaultValue={ideals}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.bonds}`}
          name="bonds"
          defaultValue={bonds}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.flaws}`}
          name="flaws"
          defaultValue={flaws}
          onChange={onFreeTextChange}
        ></textarea>

        {/* FEATS & TRAITS */}
        <ul className={`${styles.data} ${styles.featsAndTraits}`}>
          {hasLeveledUp(pc) && (
            <li className={styles.traitLabel}>
              <SkillItem
                ref={skillRefs.levelUp[0]}
                traitName="levelUp"
                trait="+Puntos de Golpe"
                pc={pc}
                openModal={openSkillModal('levelUp', 0)}
              />
            </li>
          )}

          {!hasLearnedSpellsForCurrentLevel(pc) && getDeltaSpells(pc) > 0 && (
            <li className={styles.traitLabel}>
              <SkillItem
                ref={skillRefs.spells[0]}
                traitName="newSpells"
                trait="Escoge nuevos conjuros"
                pc={pc}
                openModal={openSkillModal('spells', 0)}
              />
            </li>
          )}

          {traits.map(([traitName, trait], i) => (
            <li className={styles.traitLabel} key={traitName}>
              <SkillItem
                ref={skillRefs.traits[i]}
                traitName={traitName}
                trait={trait}
                pc={pc}
                openModal={openSkillModal('traits', i)}
              />
            </li>
          ))}

          {!!getPrimalPath(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Senda del {translatePrimalPath(getPrimalPath(pc))}
              </strong>
              <ul>
                {primalPathTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.primalPath[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('primalPath', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getBardCollege(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Colegio del {translateBardCollege(getBardCollege(pc))}
              </strong>
              <ul>
                {bardCollegeTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.bardCollege[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('bardCollege', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!invocations.length && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Invocaciones Sobrenaturales{' '}
              </strong>
              <ul>
                {invocations.map((invocationName, i) => (
                  <li className={styles.traitLabel} key={invocationName}>
                    <SkillItem
                      ref={skillRefs.invocations[i]}
                      traitName={invocationName}
                      trait="invocation"
                      pc={pc}
                      openModal={openSkillModal('invocations', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getWarlockPatron(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Pacto con {translatePatron(getWarlockPatron(pc))}
              </strong>
              <ul>
                {patronTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.patron[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('patron', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getDivineDomain(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Dominio de {translateDivineDomain(getDivineDomain(pc))}
              </strong>
              <ul>
                {divineDomainTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.divineDomain[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('divineDomain', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {hasChannelDivinity(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                <SkillItem
                  ref={skillRefs.channelDivinity.main}
                  traitName="channelDivinity"
                  trait={CLASSES.cleric.leveling[2].traits.channelDivinity}
                  pc={pc}
                  openModal={openSkillModal('channelDivinity', 'main')}
                />
              </strong>
              <ul>
                {channelDivinityTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.channelDivinity[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('channelDivinity', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getDruidCircle(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateDruidCircle(getDruidCircle(pc))}
              </strong>
              <ul>
                {druidCircleTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.druidCircle[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('druidCircle', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getRangerConclave(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Arquetipo del {translateRangerConclave(getRangerConclave(pc))}
              </strong>
              <ul>
                {rangerConclaveTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.rangerConclave[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('rangerConclave', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getMartialArchetype(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateMartialArchetype(getMartialArchetype(pc))}
              </strong>
              <ul>
                {martialArchetypeTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.martialArchetype[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('martialArchetype', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getSorcererOrigin(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateSorcererOrigin(getSorcererOrigin(pc))}
              </strong>
              <ul>
                {sorcererOriginTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.sorcererOrigin[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('sorcererOrigin', i)}
                      bigModal={traitName === 'wildMagicSurge'}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getArcaneTradition(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateArcaneTradition(getArcaneTradition(pc))}
              </strong>
              <ul>
                {arcaneTradicionTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.arcaneTradition[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('arcaneTradition', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getMonasticTradition(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateMonasticTradition(getMonasticTradition(pc))}
              </strong>
              <ul>
                {monasticTraditionTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.monasticTradition[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('monasticTradition', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getSacredOath(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateSacredOath(getSacredOath(pc))}
              </strong>
              <ul>
                {sacredOathTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.sacredOath[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('sacredOath', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getRoguishArchetype(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                {translateRoguishArchetype(getRoguishArchetype(pc))}
              </strong>
              <ul>
                {roguishArchetypeTraits.map(([traitName, trait], i) => (
                  <li className={styles.traitLabel} key={traitName}>
                    <SkillItem
                      ref={skillRefs.roguishArchetype[i]}
                      traitName={traitName}
                      trait={trait}
                      pc={pc}
                      openModal={openSkillModal('roguishArchetype', i)}
                    />
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>

        {/* PROFICIENCIES & LANGUAGES */}
        <ul className={`${styles.data} ${styles.competencesAndLanguages}`}>
          <li className={styles.traitLabel}>
            <span className={styles.traitTitle}>Idiomas:</span>{' '}
            <strong className={styles.trait}>
              {languages
                .map(language => translateLanguage(language))
                .join(', ')}
            </strong>
          </li>

          <li className={styles.traitLabel}>
            <span className={styles.traitTitle}>Competente con:</span>{' '}
            {getItemDisplayList(getItemProficiencies(pc)).map(
              (itemName, i, proficiencies) => (
                <strong className={styles.trait} key={itemName}>
                  {translateItem(itemName)}
                  {i + 1 < proficiencies.length && ', '}
                </strong>
              )
            )}
          </li>

          {CLASSES[pClass].proficiencies &&
            Object.entries(CLASSES[pClass].proficiencies).map(
              ([profName, profValue]) => (
                <li className={styles.traitLabel} key={profName}>
                  {profName}:{' '}
                  <strong className={styles.trait}>{profValue(pc)}</strong>
                </li>
              )
            )}
        </ul>
      </Form>
    </>
  );
}

export default PcSummary;
