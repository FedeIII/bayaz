import { json } from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useSubmit,
  useTransition,
} from '@remix-run/react';
import { forwardRef, useEffect, useRef, useState } from 'react';

import {
  equipWeaponInSlot,
  getPc,
  updatePc,
  switchArmor,
} from '~/services/pc.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';

import styles from '~/components/bio.module.css';
import { displayDamage, itemWithAmount, listItems } from '~/domain/display';
import { getPackItems } from '~/domain/equipment/packs';
import {
  getItem,
  translateItem,
  translatePack,
} from '~/domain/equipment/equipment';
import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import {
  getLightEncumbrance,
  getHeavyEncumbrance,
  getEquipmentWeight,
  getItemArmorClass,
  translateMoney,
} from '~/domain/characters';
import random from '~/domain/random';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

async function equipWeaponAction(formData) {
  const name = formData.get('name');
  const weaponName = formData.get('weaponName');
  const weaponSlot = formData.get('weaponSlot');

  await equipWeaponInSlot(name, weaponName, weaponSlot);
}

async function equipArmorAction(formData) {
  const name = formData.get('name');
  const armorName = formData.get('armorName');

  await switchArmor(name, armorName);
}

async function updateFreeTextsAction(formData) {
  const name = formData.get('name');
  const eyes = formData.get('eyes');
  const skin = formData.get('skin');
  const hair = formData.get('hair');
  const allies = formData.get('allies');
  const backstory = formData.get('backstory');
  const extraTraits1 = formData.get('extraTraits1');
  const extraTraits2 = formData.get('extraTraits2');

  await updatePc({
    name,
    freeText: {
      eyes,
      skin,
      hair,
      allies,
      backstory,
      extraTraits1,
      extraTraits2,
    },
  });
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const action = formData.get('action');

  if (action === 'equipWeapon') {
    await equipWeaponAction(formData);
  } else if (action === 'equipArmor') {
    await equipArmorAction(formData);
  } else {
    await updateFreeTextsAction(formData);
  }

  return null;
};

function ActionModal(props) {
  const { children, elRef, formRef, closeModal } = props;

  const ref = useRef(null);
  const [selfPosition, setSelfPosition] = useState(null);
  const elPos = elRef?.current.getBoundingClientRect();
  const formPos = formRef?.current.getBoundingClientRect();

  useEffect(() => {
    setSelfPosition(ref?.current.getBoundingClientRect());
  }, [setSelfPosition, ref?.current]);

  return (
    <div
      className={styles.actionModal}
      style={{
        top:
          (elPos?.y || 0) -
          (formPos?.y || 0) -
          (selfPosition?.height || 0) +
          'px',
        left: (elPos?.x || 0) - (formPos?.x || 0) + 'px',
      }}
      ref={ref}
    >
      <OutsideAlerter onClickOutside={closeModal} enabled>
        {!!selfPosition && children(props)}
      </OutsideAlerter>
    </div>
  );
}

function ItemModal(props) {
  const { children, elRef, formRef, closeModal } = props;

  const ref = useRef(null);
  const [selfPosition, setSelfPosition] = useState(null);
  const elPos = elRef?.current.getBoundingClientRect();
  const formPos = formRef?.current.getBoundingClientRect();

  useEffect(() => {
    setSelfPosition(ref?.current.getBoundingClientRect());
  }, [setSelfPosition, ref?.current]);

  return (
    <div
      className={styles.actionModal}
      style={{
        top:
          (elPos?.y || 0) -
          (formPos?.y || 0) -
          (selfPosition?.height || 0) +
          'px',
        left: (elPos?.x || 0) - (formPos?.x || 0) + 'px',
      }}
      onMouseLeave={closeModal}
      ref={ref}
    >
      {selfPosition && (
        <OutsideAlerter onClickOutside={closeModal} enabled>
          {children(props)}
        </OutsideAlerter>
      )}
    </div>
  );
}

function WeaponModalContent(props) {
  const { pc, weapon, equipWeapon, closeModal } = props;
  const {
    items: { weapons },
  } = pc;

  function onEquipClick(e) {
    const slot = e.target.value;
    equipWeapon(weapon.name, slot);
    closeModal();
  }

  return (
    <>
      <h3 className={styles.actionModalTitle}>{weapon.translation}</h3>
      <span className={styles.modalClose} onClick={closeModal}>
        ⨉
      </span>
      <div className={styles.modalContent}>
        <ul className={styles.modalOptions}>
          <li>
            <div>Equipar en </div>
            <select className={styles.weaponSelect} onChange={onEquipClick}>
              <option value="">Escoge hueco</option>
              {Array.from(Array(3), (_, i) => (
                <option value={i} key={i}>
                  {i}: {getItem(weapons[i]?.name)?.translation || '-'}
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
  const { pc, armor, equipArmor, closeModal } = props;
  const {
    items: {
      equipment: { armor: pArmor },
    },
  } = pc;

  function onEquipClick() {
    equipArmor(armor.name);
    closeModal();
  }

  return (
    <>
      <h3 className={styles.actionModalTitle}>{armor.translation}</h3>
      <span className={styles.modalClose} onClick={closeModal}>
        ⨉
      </span>
      <div className={styles.modalContent}>
        <ul className={styles.modalOptions}>
          <li>
            {!!pArmor && (
              <button
                type="button"
                className={styles.equipArmor}
                onClick={onEquipClick}
              >
                Equipar en lugar de {getItem(pArmor.name).translation}
              </button>
            )}
            {!pArmor && (
              <button
                type="button"
                className={styles.equipArmor}
                onClick={onEquipClick}
              >
                Equipar
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

function ItemModalContent(props) {
  const { pc, item } = props;

  const subtypeTranslation = item.subtype && translateItem(item.subtype);
  const isWeapon = item.type === 'weapon';
  const isArmor = item.type === 'armor';

  return (
    <>
      <h3 className={styles.modalTitle}>{item.translation}</h3>
      <div className={styles.modalContent}>
        <ul className={styles.modalOptionsLeft}>
          {subtypeTranslation && (
            <li className={styles.modalItem}>
              <span className={styles.modalRowTitle}>Tipo:</span>{' '}
              <strong className={styles.modalRowValue}>
                {subtypeTranslation}
              </strong>
            </li>
          )}
          {isWeapon && (
            <li className={styles.modalItem}>
              <span className={styles.modalRowTitle}>Daño:</span>{' '}
              <strong className={styles.modalRowValue}>
                {displayDamage(pc, item)}
              </strong>
            </li>
          )}
          {isArmor && (
            <li className={styles.modalItem}>
              <span className={styles.modalRowTitle}>AC:</span>{' '}
              <strong className={styles.modalRowValue}>
                {getItemArmorClass(pc, item.name)}
              </strong>
            </li>
          )}
          <li className={styles.modalItem}>
            <span className={styles.modalRowTitle}>Coste:</span>{' '}
            <strong className={styles.modalRowValue}>
              {translateMoney(item.price)}
            </strong>
          </li>
          <li className={styles.modalItem}>
            <span className={styles.modalRowTitle}>Peso:</span>{' '}
            <strong className={styles.modalRowValue}>
              {item.weight ? item.weight + ' kg' : '-'}
            </strong>
          </li>
        </ul>
      </div>
    </>
  );
}

const TreasureItem = forwardRef(function TreasureItem(props, ref) {
  const { pItem, isLast, onItemClick, openModal, closeModal } = props;
  const item = getItem(pItem.name);

  return (
    <>
      <strong
        ref={ref}
        className={styles.item}
        onClick={() => onItemClick?.(pItem.name)}
        onMouseOver={() => openModal(pItem.name)}
        onMouseOut={closeModal}
      >
        {itemWithAmount(item.translation, pItem.amount)}
      </strong>
      {!isLast && ', '}
    </>
  );
});

function PcBio() {
  const { pc } = useLoaderData();
  const {
    name,
    age,
    height,
    weight,
    items: { treasure },
    pack,
    freeText: {
      eyes,
      skin,
      hair,
      allies,
      backstory,
      extraTraits1,
      extraTraits2,
    } = {},
  } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const [isSubmitStatsShown, setIsSubmitStatsShown] = useState(false);
  const [isSubmitAlliesShown, setIsSubmitAlliesShown] = useState(false);
  const [isSubmitTraitsShown, setIsSubmitTraitsShown] = useState(false);
  const [isSubmitBackstoryShown, setIsSubmitBackstoryShown] = useState(false);

  function onStatsChange() {
    setIsSubmitStatsShown(true);
  }
  function onAlliesChange() {
    setIsSubmitAlliesShown(true);
  }
  function onTraitsChange() {
    setIsSubmitTraitsShown(true);
  }
  function onBackstoryChange() {
    setIsSubmitBackstoryShown(true);
  }

  function onFormSubmit(e) {
    setIsSubmitStatsShown(false);
    setIsSubmitAlliesShown(false);
    setIsSubmitTraitsShown(false);
    setIsSubmitBackstoryShown(false);
  }

  const submit = useSubmit();
  function equipWeapon(weaponName, weaponSlot) {
    submit(
      {
        action: 'equipWeapon',
        name,
        weaponName,
        weaponSlot,
      },
      { method: 'post' }
    );
  }

  function equipArmor(armorName) {
    submit(
      {
        action: 'equipArmor',
        name,
        armorName,
      },
      { method: 'post' }
    );
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

  const [actionModalContent, setActionModalContent] = useState(null);
  const [itemModalContent, setItemModalContent] = useState(null);

  const [itemRefs, setItemRefs] = useState({
    weapons: treasure.weapons.map(() => useRef()),
    armors: treasure.armors.map(() => useRef()),
    others: treasure.others.map(() => useRef()),
    pack: getPackItems(pack).map(() => useRef()),
  });
  const [selectedItemRef, setSelectedItemRef] = useState(null);
  const closeItemModal = () => setItemModalContent(null);
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
            equipWeapon={equipWeapon}
            closeModal={() => setActionModalContent(null)}
          />
        );
      if (item.type === 'armor')
        content = props => (
          <ArmorModalContent
            pc={pc}
            armor={item}
            equipArmor={equipArmor}
            closeModal={() => setActionModalContent(null)}
          />
        );

      setTimeout(() => setActionModalContent(() => content), 0);
    };
  }

  function openItemModal(sectionName, itemIndex) {
    return itemName => {
      const item = getItem(itemName);

      if (!actionModalContent) {
        setSelectedItemRef(itemRefs[sectionName][itemIndex]);

        setTimeout(
          () =>
            setItemModalContent(() => props => (
              <ItemModalContent pc={pc} item={item} />
            )),
          0
        );
      }
    };
  }

  // ████░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓
  // ██████████████████████████▒▒▒▒▒▓▓▓▓▓▓
  // ██████████████████████████████████▓▓▓

  const equipmentWeight = random.roundTo(0.1, getEquipmentWeight(pc));
  const lightEncumbrance = random.roundTo(0.1, getLightEncumbrance(pc));
  const heavyEncumbrance = random.roundTo(0.1, getHeavyEncumbrance(pc));

  const maxWeightDisplayed = heavyEncumbrance * 1.27;
  let equipmentWeightPos = (equipmentWeight * 100) / maxWeightDisplayed;
  equipmentWeightPos = equipmentWeightPos > 100 ? 100 : equipmentWeightPos;
  const lightEncumbrancePos = (lightEncumbrance * 100) / maxWeightDisplayed;
  const heavyEncumbrancePos = (heavyEncumbrance * 100) / maxWeightDisplayed;

  // const equipmentWeightRange = equipmentWeightPos;
  // let heavyEncumbranceRange = 100 - heavyEncumbrancePos;
  // const heavyOverlap = equipmentWeightPos - heavyEncumbrancePos;
  // if (heavyOverlap > 0) heavyEncumbranceRange -= heavyOverlap;

  // let lightEncumbranceRage = 100 - lightEncumbrancePos - heavyEncumbranceRange;
  // const lightOverlap = equipmentWeightPos - lightEncumbrancePos;
  // if (lightOverlap > 0) lightEncumbranceRage -= lightOverlap;
  // lightEncumbranceRage = lightEncumbranceRage > 0 ? lightEncumbranceRage : 0;

  // let emptyRange =
  //   100 - equipmentWeightRange - lightEncumbranceRage - heavyEncumbranceRange;
  // emptyRange = emptyRange > 0 ? emptyRange : 0;

  const segmentWidth = 2.7;

  // const numberOfBlueSegments = Math.round(
  //   Math.min(equipmentWeightRange, lightEncumbrancePos) / segmentWidth
  // );

  // let orangeRange = equipmentWeightRange - lightEncumbrancePos;
  // orangeRange = orangeRange > 0 ? orangeRange : 0;
  // const numberOfOrangeSegments = Math.round(orangeRange / segmentWidth);

  // let redRange = equipmentWeightRange - heavyEncumbrancePos;
  // redRange = redRange > 0 ? redRange : 0;
  // const numberOfRedSegments = Math.round(redRange / segmentWidth);

  // const numberOfEmptySegments = Math.round(emptyRange / segmentWidth);
  // const numberOfLightSegments = Math.round(lightEncumbranceRage / segmentWidth);
  // const numberOfHeavySegments = Math.round(
  //   heavyEncumbranceRange / segmentWidth
  // );

  let numberOfBlueSegments = 0;
  let numberOfOrangeSegments = 0;
  let numberOfRedSegments = 0;
  let numberOfFilledSegments = Math.round(equipmentWeightPos / segmentWidth);
  let numberOfEmptySegments = Math.round(lightEncumbrancePos / segmentWidth);
  let numberOfLightSegments = Math.round(
    (heavyEncumbrancePos - lightEncumbrancePos) / segmentWidth
  );
  let numberOfHeavySegments = Math.round(
    (100 - heavyEncumbrancePos) / segmentWidth
  );

  if (equipmentWeightPos < lightEncumbrancePos) {
    numberOfEmptySegments -= numberOfFilledSegments;
    numberOfBlueSegments = numberOfFilledSegments;
  } else if (equipmentWeightPos < heavyEncumbrancePos) {
    numberOfBlueSegments = numberOfEmptySegments;
    numberOfOrangeSegments = numberOfFilledSegments - numberOfEmptySegments;
    numberOfEmptySegments = 0;
    numberOfLightSegments -= numberOfOrangeSegments;
  } else {
    numberOfBlueSegments = numberOfEmptySegments;
    numberOfOrangeSegments = numberOfLightSegments;
    numberOfRedSegments =
      numberOfFilledSegments - numberOfEmptySegments - numberOfLightSegments;
    numberOfEmptySegments = 0;
    numberOfLightSegments = 0;
    numberOfHeavySegments -= numberOfRedSegments;
  }

  return (
    <>
      <img src="/images/sheet2.jpg" className={styles.sheetBackground} />
      <Form
        method="post"
        className={styles.summary}
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <input readOnly type="text" name="name" value={name} hidden />

        {/* MODALS */}
        {actionModalContent && (
          <ActionModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={() => setActionModalContent(null)}
          >
            {actionModalContent}
          </ActionModal>
        )}

        {itemModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={closeItemModal}
          >
            {itemModalContent}
          </ItemModal>
        )}

        {/* BASIC ATTRS */}
        <span className={`${styles.data} ${styles.name}`}>{name}</span>
        <span className={`${styles.data} ${styles.age}`}>{age} años</span>
        <span className={`${styles.data} ${styles.height}`}>{height} cm</span>
        <span className={`${styles.data} ${styles.weight}`}>{weight} kg</span>

        {/* FREE TEXT ATTRS */}
        <textarea
          className={`${styles.data} ${styles.eyes}`}
          name="eyes"
          defaultValue={eyes}
          onChange={onStatsChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.skin}`}
          name="skin"
          defaultValue={skin}
          onChange={onStatsChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.hair}`}
          name="hair"
          defaultValue={hair}
          onChange={onStatsChange}
        ></textarea>
        {isSubmitStatsShown && (
          <button
            type="submit"
            disabled={isCreating}
            className={`${styles.data} ${styles.submitStats}`}
          >
            Actualizar
          </button>
        )}

        {/* FREE TEXT */}
        <textarea
          className={`${styles.data} ${styles.allies}`}
          name="allies"
          defaultValue={allies}
          onChange={onAlliesChange}
        ></textarea>
        {isSubmitAlliesShown && (
          <button
            type="submit"
            disabled={isCreating}
            className={`${styles.data} ${styles.submitAllies}`}
          >
            Actualizar
          </button>
        )}

        <textarea
          className={`${styles.data} ${styles.backstory}`}
          name="backstory"
          defaultValue={backstory}
          onChange={onBackstoryChange}
        ></textarea>
        {isSubmitBackstoryShown && (
          <button
            type="submit"
            disabled={isCreating}
            className={`${styles.data} ${styles.submitBackstory}`}
          >
            Actualizar
          </button>
        )}

        <textarea
          className={`${styles.data} ${styles.extraTraits1}`}
          name="extraTraits1"
          defaultValue={extraTraits1}
          onChange={onTraitsChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.extraTraits2}`}
          name="extraTraits2"
          defaultValue={extraTraits2}
          onChange={onTraitsChange}
        ></textarea>
        {isSubmitTraitsShown && (
          <button
            type="submit"
            disabled={isCreating}
            className={`${styles.data} ${styles.submitTraits}`}
          >
            Actualizar
          </button>
        )}

        {/* TREASURE */}
        <ul className={`${styles.data} ${styles.treasure}`}>
          {!!treasure.weapons.length && (
            <li className={styles.treasureItem}>
              <u>Armas:</u>{' '}
              {treasure.weapons.map((treasureWeapon, i) => (
                <TreasureItem
                  ref={itemRefs.weapons[i]}
                  pItem={treasureWeapon}
                  isLast={i === treasure.weapons.length - 1}
                  onItemClick={onItemClick('weapons', i)}
                  openModal={openItemModal('weapons', i)}
                  closeModal={closeItemModal}
                  key={treasureWeapon.name}
                />
              ))}
            </li>
          )}
          {!!treasure.armors.length && (
            <li className={styles.treasureItem}>
              <u>Armaduras:</u>{' '}
              {treasure.armors.map((treasureArmor, i) => (
                <TreasureItem
                  ref={itemRefs.armors[i]}
                  pItem={treasureArmor}
                  isLast={i === treasure.armors.length - 1}
                  onItemClick={onItemClick('armors', i)}
                  openModal={openItemModal('armors', i)}
                  closeModal={closeItemModal}
                  key={treasureArmor.name}
                />
              ))}
            </li>
          )}
          {!!treasure.others.length && (
            <li className={styles.treasureItem}>
              {treasure.others.map((treasureItem, i) => (
                <TreasureItem
                  ref={itemRefs.others[i]}
                  pItem={treasureItem}
                  isLast={i === treasure.others.length - 1}
                  openModal={openItemModal('others', i)}
                  closeModal={closeItemModal}
                  key={treasureItem.name}
                />
              ))}
            </li>
          )}
          {pack && (
            <li className={styles.treasureItem}>
              <u>{translatePack(pack) + ':'}</u>{' '}
              {getPackItems(pack).map((packItem, i, packItems) => (
                <TreasureItem
                  ref={itemRefs.pack[i]}
                  pItem={packItem}
                  isLast={i === packItems.length - 1}
                  openModal={openItemModal('pack', i)}
                  closeModal={closeItemModal}
                  key={packItem.name}
                />
              ))}
            </li>
          )}
          <li className={styles.totalTreasure}>
            Peso (kg):{' '}
            <div className={styles.weightBar}>
              <span className={styles.blueBar}>
                {/* {Array(numberOfBlueSegments).fill('▓')} */}
                {Array(numberOfBlueSegments).fill('▒')}
                {/* {Array(numberOfBlueSegments).fill('█')} */}
              </span>
              <span className={styles.orangeBar}>
                {/* {Array(numberOfOrangeSegments).fill('▓')} */}
                {Array(numberOfOrangeSegments).fill('▒')}
                {/* {Array(numberOfOrangeSegments).fill('█')} */}
              </span>
              <span className={styles.redBar}>
                {/* {Array(numberOfRedSegments).fill('▓')} */}
                {Array(numberOfRedSegments).fill('▒')}
                {/* {Array(numberOfRedSegments).fill('█')} */}
              </span>
              <span className={styles.blueBar}>
                {Array(numberOfEmptySegments).fill('░')}
              </span>
              <span className={styles.blueBar}>
                {Array(numberOfLightSegments).fill('░')}
                {/* {Array(numberOfLightSegments).fill('▒')} */}
              </span>
              <span className={styles.blueBar}>
                {Array(numberOfHeavySegments).fill('░')}
                {/* {Array(numberOfHeavySegments).fill('▓')} */}
              </span>
              <span
                className={styles.equipmentWeight}
                style={{
                  left: `calc(${equipmentWeightPos}% - 4px)`,
                  color:
                    equipmentWeightPos > lightEncumbrancePos
                      ? equipmentWeightPos > heavyEncumbrancePos
                        ? 'red'
                        : 'orange'
                      : 'iniital',
                }}
              >
                {equipmentWeight}
              </span>
              <span
                className={styles.lightEncumbrance}
                style={{ left: `calc(${lightEncumbrancePos}% - 4px)` }}
              >
                {lightEncumbrance}
              </span>
              <span
                className={styles.heavyEncumbrance}
                style={{ left: `calc(${heavyEncumbrancePos}% - 4px)` }}
              >
                {heavyEncumbrance}
              </span>
            </div>
          </li>
        </ul>
      </Form>
    </>
  );
}

export default PcBio;
