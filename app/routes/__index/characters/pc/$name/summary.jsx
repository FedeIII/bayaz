import { json } from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useSubmit,
  useTransition,
} from '@remix-run/react';
import { Fragment, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  getPc,
  equipWeapons,
  updatePc,
  switchWeapons,
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
  getExtraHitPoints,
  SKILLS,
  skillCheckBonus,
  getConditionalSkills,
  getSkills,
  translateSkill,
  translateLanguage,
  getPassivePerception,
  getItemProficiencies,
  getArmorClass,
  getExtraArmorClass,
  getTraits,
  hasExtraWeapons,
  getExtraWeapons,
} from '~/domain/characters';
import { getExpertSkills } from '~/domain/rogue';
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
import { getPrimalPath, translatePrimalPath } from '~/domain/barbarian';
import {
  displayMoneyAmount,
  displayTrait,
  getAttacks,
  getItemDisplayList,
  getSpecialAttacks,
  increment,
  listItems,
} from '~/domain/display';
import { getItem, translateItem } from '~/domain/equipment/equipment';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import { translateBackground } from '~/domain/backgrounds';
import { InventoryItem } from '~/components/item/inventoryItem';
import { useInventoryItems } from '~/components/item/useInventoryItems';
import { ItemModal } from '~/components/item/itemModal';

import styles from '~/components/sheet.module.css';
import itemStyles from '~/components/item/inventoryItem.module.css';

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
            </select>{' '}
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
    speed,
    level,
    maxHitPoints,
    hitPoints,
    exp,
    languages,
    items: { weapons, equipment },
    money,
    background = {},
    freeText: { playerName, personality, ideals, bonds, flaws } = {},
  } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

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
    { name, url: `/characters/pc/${name}/summary`, level: 1 },
    {
      name: 'Inventario',
      url: `/characters/pc/${name}/bio`,
      level: 2,
    },
    {
      name: 'Conjuros',
      url: `/characters/pc/${name}/spells`,
      level: 2,
    },
  ]);

  const submit = useSubmit();

  function onWeaponChange(i) {
    return newWeaponName => {
      submit(
        {
          action: 'equipWeapons',
          name,
          oldWeaponName: weapons[i].name,
          newWeaponName,
        },
        { method: 'post' }
      );
    };
  }

  function onWeaponDrop(weaponName, weaponSlot) {
    submit(
      {
        action: 'switchWeapons',
        name,
        weaponName,
        weaponSlot,
      },
      { method: 'post' }
    );
  }

  const [actionModalContent, setActionModalContent] = useState(null);

  const [itemRefs, setItemRefs] = useState({
    weapons: [useRef(), useRef(), useRef()],
  });

  const [
    itemModalContent,
    closeItemModal,
    openItemModal,
    selectedItemRef,
    setSelectedItemRef,
  ] = useInventoryItems(pc, itemRefs, actionModalContent);

  const formRef = useRef(null);

  function onItemClick(itemType, itemIndex) {
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
      // if (item.type === 'armor')
      //   content = props => (
      //     <ArmorModalContent
      //       pc={pc}
      //       armor={item}
      //       equipArmor={equipArmor}
      //       closeModal={() => setActionModalContent(null)}
      //     />
      //   );

      setTimeout(() => setActionModalContent(() => content), 0);
    };
  }

  return (
    <>
      <img src="/images/sheet1.jpg" className={styles.sheetBackground} />
      <Form
        method="post"
        className={styles.summary}
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <input readOnly type="text" name="name" value={name} hidden />

        {/* MODALS */}
        {actionModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={() => setActionModalContent(null)}
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
        <span className={`${styles.data} ${styles.name}`}>{name}</span>
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
        <span className={`${styles.data} ${styles.speed}`}>{speed}m</span>
        <span className={`${styles.data} ${styles.maxHitPoints}`}>
          {maxHitPoints}
        </span>
        <span className={`${styles.data} ${styles.hitPoints}`}>
          {hitPoints}
        </span>
        <span className={`${styles.data} ${styles.hitDice}`}>
          {CLASSES[pClass].hitDice} {increment(getExtraHitPoints(pc))}
        </span>
        <span className={`${styles.data} ${styles.remainingHitDice}`}>
          {CLASSES[pClass].hitDice}
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
              <strong>{translateItem(equipment.armor.name)}</strong>
            </li>
          )}
          {!!equipment.shield && (
            <li>
              <u>Escudo:</u>{' '}
              <strong>{translateItem(equipment.shield.name)}</strong>
            </li>
          )}
          {!!equipment.ammunition?.length && (
            <li>
              <u>Proyectiles:</u>{' '}
              <strong>{listItems(equipment.ammunition)}</strong>
            </li>
          )}
          {!!equipment.others?.length && <li>{listItems(equipment.others)}</li>}
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
          {Object.entries(getTraits(pc)).map(([traitName, trait]) => (
            <li className={styles.traitLabel} key={traitName}>
              {displayTrait(traitName, trait, pc)}
            </li>
          ))}

          {!!getPrimalPath(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Senda Primaria:</span>
              <strong className={styles.trait}>
                {' '}
                Senda del {translatePrimalPath(getPrimalPath(pc))}
              </strong>
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

          {!!getExpertSkills(pc)?.length && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Experto en:</span>
              <ul className={styles.traitLabel}>
                {getExpertSkills(pc).map(skillName => (
                  <li className={styles.traitItem} key={skillName}>
                    {translateSkill(skillName)}
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
