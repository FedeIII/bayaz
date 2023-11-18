import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { createRef, useEffect, useRef, useState } from 'react';

import {
  equipWeaponInSlot,
  getPc,
  updatePc,
  switchArmor,
  dropTreasureWeapon,
  dropTreasureArmor,
  dropTreasureItem,
  changeTreasureItemAmount,
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
import { getSessionUser } from '~/services/session.server';
import { isDm } from '~/domain/user';

import styles from '~/components/bio.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ request, params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }

  const user = await getSessionUser(request);

  return json({ pc, isDm: isDm(user) });
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

async function changeAmountAction(formData) {
  const name = formData.get('name');
  const itemName = formData.get('itemName');
  const itemAmount = formData.get('itemAmount');

  await changeTreasureItemAmount(name, itemName, itemAmount);
}

async function addItemToTreasureAction(formData) {
  const name = formData.get('name');
  const itemName = formData.get('itemName');
  const itemAmount = formData.get('itemAmount');

  await addItemToTreasure(name, itemName, itemAmount);
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
  } else if (action === 'changeAmount') {
    await changeAmountAction(formData);
    return null;
  } else if (action === 'addItemToTreasure') {
    await addItemToTreasureAction(formData);
  } else {
    await updateFreeTextsAction(formData);
  }

  return null;
};

function ItemModalContent(props) {
  const { item, dropItem, changeAmount, addToTreasure, closeModal } = props;

  function onDropClick(e) {
    const itemName = e.target.value;
    dropItem(itemName);
    closeModal();
  }

  const [amount, setAmount] = useState(item.amount);
  function onAmountChange(e) {
    setAmount(e.target.value);
  }

  function onChangeAmountClick() {
    changeAmount(item.name, amount);
    closeModal();
  }

  function onAddToTreasureClick() {
    addToTreasure(item.name, amount);
    closeModal();
  }

  return (
    <>
      <h3 className="inventory-item__action-modal-title">{item.translation}</h3>
      <span className="inventory-item__modal-close" onClick={closeModal}>
        ⨉
      </span>
      <div className="inventory-item__modal-content">
        <ul className="inventory-item__modal-options">
          {!!addToTreasure && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                onClick={onAddToTreasureClick}
              >
                Añadir items
              </button>{' '}
              <input
                type="number"
                name="amount"
                min="1"
                value={amount}
                onChange={onAmountChange}
                className="inventory-item__amount-input"
              />
            </li>
          )}
          {!!changeAmount && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                onClick={onChangeAmountClick}
              >
                Cambiar cantidad
              </button>{' '}
              <input
                type="number"
                name="amount"
                min="1"
                value={amount}
                onChange={onAmountChange}
                className="inventory-item__amount-input"
              />
            </li>
          )}
          {!!dropItem && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                value={item.name}
                onClick={onDropClick}
              >
                Tirar {item.translation}
              </button>
            </li>
          )}
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
      <h3 className="inventory-item__action-modal-title">
        {weapon.translation}
      </h3>
      <span className="inventory-item__modal-close" onClick={closeModal}>
        ⨉
      </span>
      <div className="inventory-item__modal-content">
        <ul className="inventory-item__modal-options">
          <li>
            <span>Equipar en </span>
            <select className="bio__weapon-select" onChange={onEquipClick}>
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
              className="inventory-item__drop-item-button"
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
      <h3 className="inventory-item__action-modal-title">
        {armor.translation}
      </h3>
      <span className="inventory-item__modal-close" onClick={closeModal}>
        ⨉
      </span>
      <div className="inventory-item__modal-content">
        <ul className="inventory-item__modal-options">
          <li>
            {!!pArmor && (
              <button
                type="button"
                className="bio__equip-armor"
                onClick={onEquipClick}
              >
                Equipar en lugar de {getItem(pArmor.name).translation}
              </button>
            )}
            {!pArmor && (
              <button
                type="button"
                className="bio__equip-armor"
                onClick={onEquipClick}
              >
                Equipar
              </button>
            )}
          </li>
          <li>
            <button
              type="button"
              className="inventory-item__drop-item-button"
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
  const { pc, isDm } = useLoaderData();
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

  function changeAmount(itemName, itemAmount) {
    submit(
      {
        action: 'changeAmount',
        name,
        itemName,
        itemAmount,
      },
      { method: 'post' }
    );
  }

  function addToTreasure(itemName, itemAmount) {
    submit(
      {
        action: 'addItemToTreasure',
        name,
        itemName,
        itemAmount,
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
    if (treasure.armors.length) {
      itemRefs.armors.current = treasure.armors.map(createRef);
    }
    if (treasure.others.length) {
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
    return pItem => {
      const item = getItem(pItem);

      setSelectedItemRef(itemRefs[itemType].current[itemIndex]);

      let content;
      if (itemType === 'others') {
        content = props => (
          <ItemModalContent
            item={item}
            dropItem={dropItem}
            changeAmount={changeAmount}
            closeModal={() => setActionModalContent(null)}
          />
        );
      } else if (itemType === 'inventorySearchResults') {
        content = props => (
          <ItemModalContent
            item={item}
            addToTreasure={addToTreasure}
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
      <img src="/images/sheet2.jpg" className="bio__background" />
      <Form method="post" className="bio" onSubmit={onFormSubmit} ref={formRef}>
        <input readOnly type="text" name="name" value={name} hidden />

        {/* MODALS */}
        {actionModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={() => setActionModalContent(null)}
            isDm={isDm}
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
            isDm={isDm}
          >
            {itemModalContent}
          </ItemModal>
        )}

        {/* BASIC ATTRS */}
        <span className="bio__data bio__name">{name}</span>
        <span className="bio__data bio__age">{age} años</span>
        <span className="bio__data bio__height">{height} cm</span>
        <span className="bio__data bio__weight">{weight} kg</span>

        {/* FREE TEXT ATTRS */}
        <textarea
          className="bio__data bio__eyes"
          name="eyes"
          defaultValue={eyes}
          onChange={onStatsChange}
        ></textarea>
        <textarea
          className="bio__data bio__skin"
          name="skin"
          defaultValue={skin}
          onChange={onStatsChange}
        ></textarea>
        <textarea
          className="bio__data bio__hair"
          name="hair"
          defaultValue={hair}
          onChange={onStatsChange}
        ></textarea>
        {isSubmitStatsShown && (
          <button type="submit" className="bio__data bio__submit-stats">
            Actualizar
          </button>
        )}

        {/* FREE TEXT */}
        <textarea
          className="bio__data bio__allies"
          name="allies"
          defaultValue={allies}
          onChange={onAlliesChange}
        ></textarea>
        {isSubmitAlliesShown && (
          <button type="submit" className="bio__data bio__submit-allies">
            Actualizar
          </button>
        )}

        <textarea
          className="bio__data bio__backstory"
          name="backstory"
          defaultValue={backstory}
          onChange={onBackstoryChange}
        ></textarea>
        {isSubmitBackstoryShown && (
          <button type="submit" className="bio__data bio__submit-backstory">
            Actualizar
          </button>
        )}

        <textarea
          className="bio__data bio__extra-traits1"
          name="extraTraits1"
          defaultValue={extraTraits1}
          onChange={onTraitsChange}
        ></textarea>
        <textarea
          className="bio__data bio__extra-traits2"
          name="extraTraits2"
          defaultValue={extraTraits2}
          onChange={onTraitsChange}
        ></textarea>
        {isSubmitTraitsShown && (
          <button type="submit" className="bio__data bio__submit-traits">
            Actualizar
          </button>
        )}

        {/* TREASURE */}
        <div className="bio__data bio__treasure">
          <ul className="bio__treasure-list">
            {!!treasure.weapons.length && (
              <li className="bio__treasure-item">
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
              <li className="bio__treasure-item">
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
              <li className="bio__treasure-item">
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
              <li className="bio__treasure-item">
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
          <div className="bio__total-treasure">
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
          <div className="bio__treasure-menu">
            {!isTreasureScreenOpen && (
              <button
                type="button"
                className="bio__open-treasure-screen"
                onClick={openTreasureScreen}
              >
                +
              </button>
            )}
            {isTreasureScreenOpen && (
              <button
                type="button"
                className="bio__close-treasure-screen"
                onClick={closeTreasureScreen}
              >
                ✕
              </button>
            )}
          </div>
        </div>
        {isTreasureScreenOpen && (
          <div className="bio__data bio__treasure-screen">
            <div className="bio__treasure-searcher">
              Buscar Items:{' '}
              <input
                className="bio__treasure-searcher-input"
                value={itemSearch}
                onChange={onSearchChange}
              />
            </div>
            <ul className="bio__section-items">
              {itemResults.map((item, i) => (
                <li className="bio__section-item" key={item.name}>
                  <InventoryItem
                    ref={itemRefs.inventorySearchResults.current[i]}
                    pItem={item}
                    isLast
                    onItemClick={onItemClick('inventorySearchResults', i)}
                    openModal={openItemModal('inventorySearchResults', i)}
                    closeModal={closeItemModal}
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
