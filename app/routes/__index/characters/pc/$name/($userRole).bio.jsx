import { json, redirect } from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useSubmit,
  useTransition,
} from '@remix-run/react';
import { createRef, useEffect, useRef, useState } from 'react';

import {
  equipWeaponInSlot,
  getPc,
  updatePc,
  switchArmor,
  dropTreasureWeapon,
  dropTreasureArmor,
  dropTreasureItem,
} from '~/services/pc.server';
import { useAddMenuItems } from '~/components/hooks/useAddMenuItems';
import { getPackItems } from '~/domain/equipment/packs';
import { getItem, translatePack } from '~/domain/equipment/equipment';
import {
  getLightEncumbrance,
  getHeavyEncumbrance,
  getEquipmentWeight,
} from '~/domain/characters';
import random from '~/domain/random';
import { ItemModal } from '~/components/modal/itemModal';
import { InventoryItem } from '~/components/modal/inventoryItem';
import { useInventoryItems } from '~/components/modal/useInventoryItems';
import { GrowBar } from '~/components/indicators/growBar';
import { getSearchResults } from '~/domain/search';
import { addItemToTreasure } from '~/domain/characterMutations';

import styles from '~/components/bio.module.css';
import itemStyles from '~/components/modal/inventoryItem.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc, isForPlayers: params.userRole === 'players' });
};

async function equipWeaponAction(formData) {
  const name = formData.get('name');
  const weaponName = formData.get('weaponName');
  const weaponSlot = formData.get('weaponSlot');

  await equipWeaponInSlot(name, weaponName, weaponSlot);
}

async function dropWeaponAction(formData) {
  const name = formData.get('name');
  const weaponName = formData.get('weaponName');

  await dropTreasureWeapon(name, weaponName);
}

async function equipArmorAction(formData) {
  const name = formData.get('name');
  const armorName = formData.get('armorName');

  await switchArmor(name, armorName);
}

async function dropArmorAction(formData) {
  const name = formData.get('name');
  const armorName = formData.get('armorName');

  await dropTreasureArmor(name, armorName);
}

async function dropItemAction(formData) {
  const name = formData.get('name');
  const itemName = formData.get('itemName');

  await dropTreasureItem(name, itemName);
}

async function addItemToTreasureAction(formData) {
  const name = formData.get('name');
  const itemName = formData.get('itemName');

  await addItemToTreasure(name, itemName);
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

  const name = formData.get('name');
  const action = formData.get('action');

  if (action === 'equipWeapon') {
    await equipWeaponAction(formData);
    return redirect(`/characters/pc/${name}/summary`);
  } else if (action === 'dropWeapon') {
    await dropWeaponAction(formData);
    return null;
  } else if (action === 'equipArmor') {
    await equipArmorAction(formData);
    return redirect(`/characters/pc/${name}/summary`);
  } else if (action === 'dropArmor') {
    await dropArmorAction(formData);
    return null;
  } else if (action === 'dropItem') {
    await dropItemAction(formData);
    return null;
  } else if (action === 'addItemToTreasure') {
    await addItemToTreasureAction(formData);
  } else {
    await updateFreeTextsAction(formData);
  }

  return null;
};

function ItemModalContent(props) {
  const { item, dropItem, closeModal } = props;

  function onDropClick(e) {
    const itemName = e.target.value;
    dropItem(itemName);
    closeModal();
  }

  return (
    <>
      <h3 className={itemStyles.actionModalTitle}>{item.translation}</h3>
      <span className={itemStyles.modalClose} onClick={closeModal}>
        ⨉
      </span>
      <div className={itemStyles.modalContent}>
        <ul className={itemStyles.modalOptions}>
          <li>
            <button
              type="button"
              className={styles.dropItemButton}
              value={item.name}
              onClick={onDropClick}
            >
              Tirar {item.translation}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function WeaponModalContent(props) {
  const { pc, weapon, equipWeapon, dropWeapon, closeModal } = props;
  const {
    items: { weapons },
  } = pc;

  function onEquipClick(e) {
    const slot = e.target.value;
    equipWeapon(weapon.name, slot);
    closeModal();
  }

  function onDropClick(e) {
    const weaponName = e.target.value;
    dropWeapon(weaponName);
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
            <span>Equipar en </span>
            <select className={styles.weaponSelect} onChange={onEquipClick}>
              <option value="">Escoge hueco</option>
              {Array.from(Array(3), (_, i) => (
                <option value={i} key={i}>
                  {i}: {getItem(weapons[i]?.name)?.translation || '-'}
                </option>
              ))}
            </select>
          </li>
          <li>
            <button
              type="button"
              className={styles.dropItemButton}
              value={weapon.name}
              onClick={onDropClick}
            >
              Tirar {weapon.translation}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function ArmorModalContent(props) {
  const { pc, armor, equipArmor, dropArmor, closeModal } = props;
  const {
    items: {
      equipment: { armor: pArmor },
    },
  } = pc;

  function onEquipClick() {
    equipArmor(armor.name);
    closeModal();
  }

  function onDropClick(e) {
    const armorName = e.target.value;
    dropArmor(armorName);
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
          <li>
            <button
              type="button"
              className={styles.dropItemButton}
              value={armor.name}
              onClick={onDropClick}
            >
              Tirar {armor.translation}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function PcBio() {
  const { pc, isForPlayers } = useLoaderData();
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

  function dropWeapon(weaponName) {
    submit(
      {
        action: 'dropWeapon',
        name,
        weaponName,
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

  function dropArmor(armorName) {
    submit(
      {
        action: 'dropArmor',
        name,
        armorName,
      },
      { method: 'post' }
    );
  }

  function dropItem(itemName) {
    submit(
      {
        action: 'dropItem',
        name,
        itemName,
      },
      { method: 'post' }
    );
  }

  function addToTreasure(itemName) {
    submit(
      {
        action: 'addItemToTreasure',
        name,
        itemName,
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

  const [itemSearch, setItemSearch] = useState('');
  function onSearchChange(e) {
    setItemSearch(e.target.value);
  }

  const [itemResults, setItemResults] = useState([]);
  useEffect(() => {
    if (itemSearch.length > 2) {
      setItemResults(getSearchResults(itemSearch, ['equipment']).equipment);
    }
  }, [itemSearch]);

  const [itemRefs, setItemRefs] = useState({
    weapons: useRef(treasure.weapons.map(createRef)),
    armors: useRef(treasure.armors.map(createRef)),
    others: useRef(treasure.others.map(createRef)),
    pack: useRef(getPackItems(pack).map(createRef)),
    inventorySearchResults: useRef(itemResults.map(createRef)),
  });

  useEffect(() => {
    if (treasure.weapons.length) {
      itemRefs.weapons.current = treasure.weapons.map(createRef);
    }
    if (itemResults.length) {
      itemRefs.armors.current = treasure.armors.map(createRef);
    }
    if (itemResults.length) {
      itemRefs.others.current = treasure.others.map(createRef);
    }
    if (itemResults.length) {
      itemRefs.inventorySearchResults.current = itemResults.map(createRef);
    }
  }, [treasure.weapons, treasure.armors, treasure.others, itemResults]);

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

      setSelectedItemRef(itemRefs[itemType].current[itemIndex]);

      let content;
      if (itemType === 'others') {
        content = props => (
          <ItemModalContent
            item={item}
            dropItem={dropItem}
            closeModal={() => setActionModalContent(null)}
          />
        );
      } else if (item.type === 'weapon') {
        content = props => (
          <WeaponModalContent
            pc={pc}
            weapon={item}
            equipWeapon={equipWeapon}
            dropWeapon={dropWeapon}
            closeModal={() => setActionModalContent(null)}
          />
        );
      } else if (item.type === 'armor') {
        content = props => (
          <ArmorModalContent
            pc={pc}
            armor={item}
            equipArmor={equipArmor}
            dropArmor={dropArmor}
            closeModal={() => setActionModalContent(null)}
          />
        );
      }

      setTimeout(() => setActionModalContent(() => content), 0);
    };
  }

  const [isTreasureScreenOpen, setIsTreasureScreenOpen] = useState(false);
  function openTreasureScreen() {
    setIsTreasureScreenOpen(true);
  }
  function closeTreasureScreen() {
    setIsTreasureScreenOpen(false);
  }

  const equipmentWeight = random.roundTo(0.1, getEquipmentWeight(pc));
  const lightEncumbrance = random.roundTo(0.1, getLightEncumbrance(pc));
  const heavyEncumbrance = random.roundTo(0.1, getHeavyEncumbrance(pc));

  const maxWeightDisplayed = heavyEncumbrance * 1.27;
  let equipmentWeightPos = (equipmentWeight * 100) / maxWeightDisplayed;
  equipmentWeightPos = equipmentWeightPos > 100 ? 100 : equipmentWeightPos;
  const lightEncumbrancePos = (lightEncumbrance * 100) / maxWeightDisplayed;
  const heavyEncumbrancePos = (heavyEncumbrance * 100) / maxWeightDisplayed;

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
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={() => setActionModalContent(null)}
            isForPlayers={isForPlayers}
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
            isForPlayers={isForPlayers}
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
        <div className={`${styles.data} ${styles.treasure}`}>
          <ul className={styles.treasureList}>
            {!!treasure.weapons.length && (
              <li className={styles.treasureItem}>
                <u>Armas:</u>{' '}
                {treasure.weapons.map((treasureWeapon, i) => (
                  <InventoryItem
                    ref={itemRefs.weapons.current[i]}
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
                  <InventoryItem
                    ref={itemRefs.armors.current[i]}
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
                  <InventoryItem
                    ref={itemRefs.others.current[i]}
                    pItem={treasureItem}
                    isLast={i === treasure.others.length - 1}
                    onItemClick={onItemClick('others', i)}
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
                  <InventoryItem
                    ref={itemRefs.pack.current[i]}
                    pItem={packItem}
                    isLast={i === packItems.length - 1}
                    openModal={openItemModal('pack', i)}
                    closeModal={closeItemModal}
                    key={packItem.name}
                  />
                ))}
              </li>
            )}
          </ul>
          <div className={styles.totalTreasure}>
            Peso (kg):{' '}
            <GrowBar
              cursorPos={equipmentWeightPos}
              cursorValue={equipmentWeight}
              softLimit={lightEncumbrancePos}
              softValue={lightEncumbrance}
              hardLimit={heavyEncumbrancePos}
              hardValue={heavyEncumbrance}
            />
          </div>
          <div className={styles.treasureMenu}>
            {!isTreasureScreenOpen && (
              <button
                type="button"
                className={styles.openTreasureScreen}
                onClick={openTreasureScreen}
              >
                +
              </button>
            )}
            {isTreasureScreenOpen && (
              <button
                type="button"
                className={styles.closeTreasureScreen}
                onClick={closeTreasureScreen}
              >
                ✕
              </button>
            )}
          </div>
        </div>
        {isTreasureScreenOpen && (
          <div className={`${styles.data} ${styles.treasureScreen}`}>
            Buscar Items:{' '}
            <input
              className={``}
              value={itemSearch}
              onChange={onSearchChange}
            />
            <ul className={styles.sectionItems}>
              {itemResults.map((item, i) => (
                <li className={styles.sectionItem} key={item.name}>
                  <InventoryItem
                    ref={itemRefs.inventorySearchResults.current[i]}
                    pItem={item}
                    isLast
                    openModalOnClick
                    openModal={openItemModal('inventorySearchResults', i)}
                    actions={{ addToTreasure: () => addToTreasure(item.name) }}
                    key={item.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </>
  );
}

export default PcBio;
