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
  switchWeapons,
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
  getRemainingHitDice,
  hasLeveledUp,
} from '~/domain/characters';
import {
  getSorcererOrigin,
  translateSorcererOrigin,
  getDragonAncestor,
  translateDragonAncestor,
} from '~/domain/sorcerer';
import { getFightingStyles, translateFightingStyle } from '~/domain/fighter';
import {
  getFavoredEnemies,
  translateFavoredEnemy,
  getFavoredTerrains,
  translateFavoredTerrain,
  getRangerArchetype,
  translateRangerArchetype,
} from '~/domain/ranger';
import { translateDivineDomain, getDivineDomain } from '~/domain/cleric';
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
import { getItem, translateItem } from '~/domain/equipment/equipment';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import { translateBackground } from '~/domain/backgrounds/backgrounds';
import { InventoryItem } from '~/components/modal/inventoryItem';
import { useInventoryItems } from '~/components/modal/useInventoryItems';
import { ItemModal } from '~/components/modal/itemModal';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SkillModal } from '~/components/modal/skillModal';
import { useTitle } from '~/components/hooks/useTitle';
import { hasLearnedSpellsForCurrentLevel } from '~/domain/spells/spells';
import {
  getBardCollege,
  getBardCollegeTraits,
  translateBardCollege,
} from '~/domain/classes/bard/bard';

import styles from '~/components/sheet.module.css';
import itemStyles from '~/components/modal/inventoryItem.module.css';

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

  await equipWeapons(name, oldWeaponName, newWeaponName);
}

async function switchWeaponsAction(formData) {
  const name = formData.get('name');
  const weaponName = formData.get('weaponName');
  const weaponSlot = formData.get('weaponSlot');

  await switchWeapons(name, weaponName, weaponSlot);
}

async function switchArmorAction(formData) {
  const name = formData.get('name');
  const newArmorName = formData.get('newArmorName');

  await switchArmor(name, newArmorName);
}

async function updateFreeTexts(formData) {
  const name = formData.get('name');
  const playerName = formData.get('playerName');
  const personality = formData.get('personality');
  const ideals = formData.get('ideals');
  const bonds = formData.get('bonds');
  const flaws = formData.get('flaws');

  await updatePc({
    name,
    freeText: { playerName, personality, ideals, bonds, flaws },
  });
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const action = formData.get('action');

  if (action === 'equipWeapons') {
    await equipWeaponsAction(formData);
  } else if (action === 'switchWeapons') {
    await switchWeaponsAction(formData);
  } else if (action === 'equipArmor') {
    await switchArmorAction(formData);
  } else {
    await updateFreeTexts(formData);
  }

  return null;
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
        action: 'switchWeapons',
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

  const [skillRefs, setSkillRefs] = useState({
    levelUp: [useRef()],
    spells: [useRef()],
    traits: traits.map(() => useRef()),
    hp: [useRef()],
  });

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(pc, skillRefs);

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

  function animateHitPoints(addExtraHitPoints, i) {
    setTimeout(() => {
      setHitPointsState(hitPoints - addExtraHitPoints + i);
    }, (1000 / addExtraHitPoints) * i + 1000);

    if (addExtraHitPoints === i) return;
    else animateHitPoints(addExtraHitPoints, i + 1);
  }

  useEffect(() => {
    if (window) {
      const url = new URL(window?.location.href);
      const addExtraHitPoints = url.searchParams.get('addExtraHitPoints');
      if (addExtraHitPoints) {
        setTimeout(() => {
          setExtraHitPoints(null);
        }, 5000);
        setHitPointsState(hitPoints - addExtraHitPoints);
        setExtraHitPoints(addExtraHitPoints);
        animateHitPoints(parseInt(addExtraHitPoints, 10), 0);
      }
    }
  }, []);

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
        <span className={`${styles.data} ${styles.hitPoints}`}>
          {hitPointsState}
          {!!extraHitPoints && (
            <span className={`${styles.data} ${styles.extraHitPoints}`}>
              {increment(extraHitPoints)}
            </span>
          )}
        </span>
        <span className={`${styles.data} ${styles.hitDice}`}>
          {getHitDice(pc)} {increment(getStatMod(getStat(pc, 'con')))}
        </span>
        <span className={`${styles.data} ${styles.remainingHitDice}`}>
          {getRemainingHitDice(pc)}
        </span>

        {/* ATTACKS */}
        {getAttacks(pc).map((attack, i) => {
          const [_1, drag] = useDrag(
            () => ({
              type: 'WEAPON',
              item: { value: attack.weapon.name },
            }),
            [attack.weapon.name]
          );

          const [_2, drop] = useDrop(
            () => ({
              accept: 'WEAPON',
              drop: item => onWeaponDrop(item.value, i),
            }),
            []
          );

          return (
            <Fragment key={attack.weapon.name}>
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
                    key={attack.weapon.name}
                  />
                </label>

                {!!attack.specialAttackIndex && (
                  <sup className={styles.superscript}>
                    {attack.specialAttackIndex}
                  </sup>
                )}
              </div>
              <span className={`${styles.data} ${styles['attackBonus-' + i]}`}>
                {increment(attack.bonus)}
              </span>
              <span className={`${styles.data} ${styles['attackType-' + i]}`}>
                {attack.damage}
                <br />
                {attack.type}
              </span>
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

          {!hasLearnedSpellsForCurrentLevel(pc) && (
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
                {getPrimalPathTraits(pc).map(([traitName, trait], i) => (
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
              </ul>
            </li>
          )}

          {!!getBardCollege(pc) && (
            <li className={styles.traitLabel}>
              <strong className={styles.trait}>
                Colegio del {translateBardCollege(getBardCollege(pc))}
              </strong>
              <ul>
                {getBardCollegeTraits(pc).map(([traitName, trait], i) => (
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
              </ul>
            </li>
          )}

          {!!getDivineDomain(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Dominio Divino:</span>
              <strong className={styles.trait}>
                {' '}
                Dominio de {translateDivineDomain(getDivineDomain(pc))}
              </strong>
            </li>
          )}

          {!!getFavoredEnemies(pc)?.length && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>
                Enemigos Predilectos (Bonificacion en Inteligencia y Sabiduría
                x2):
              </span>
              <ul className={styles.traitLabel}>
                {getFavoredEnemies(pc).map(favoredEnemy => (
                  <li className={styles.traitItem} key={favoredEnemy}>
                    {translateFavoredEnemy(favoredEnemy)}
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getFavoredTerrains(pc)?.length && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>
                Terrenos Predilectos (Bonificacion en Inteligencia y Sabiduría
                x2 + reglas extra):
              </span>
              <ul className={styles.traitLabel}>
                {getFavoredTerrains(pc).map(favoredEnemy => (
                  <li className={styles.traitItem} key={favoredEnemy}>
                    {translateFavoredTerrain(favoredEnemy)}
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getRangerArchetype(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>
                Arquetipo de Explorador:
              </span>
              <strong className={styles.trait}>
                {' '}
                {translateRangerArchetype(getRangerArchetype(pc))}
              </strong>
            </li>
          )}

          {!!getFightingStyles(pc)?.length && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Estilos de Combate:</span>
              <ul className={styles.traitLabel}>
                {getFightingStyles(pc).map(fightingStyle => (
                  <li className={styles.traitItem} key={fightingStyle}>
                    {translateFightingStyle(fightingStyle)}
                  </li>
                ))}
              </ul>
            </li>
          )}

          {!!getSorcererOrigin(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Origen de Hechicero:</span>
              <strong className={styles.trait}>
                {' '}
                {translateSorcererOrigin(getSorcererOrigin(pc))}
              </strong>
              {getSorcererOrigin(pc) === 'draconic-bloodline' && (
                <ul className={styles.traitLabel}>
                  <li className={styles.traitItem}>
                    CA 13 + Dex bonus sin armadura
                  </li>
                  <li className={styles.traitItem}>
                    x2 Bonus a pruebas de Carisma contra dragones
                  </li>
                </ul>
              )}
              {getSorcererOrigin(pc) === 'wild-magic' && (
                <ul className={styles.traitLabel}>
                  <li className={styles.traitItem}>Oleada de Magia Salvaje</li>
                  <li className={styles.traitItem}>Mareas de Caos</li>
                </ul>
              )}
            </li>
          )}

          {!!getDragonAncestor(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Ancestro Dragón:</span>
              <strong className={styles.trait}>
                {' '}
                {translateDragonAncestor(getDragonAncestor(pc))}
              </strong>
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
