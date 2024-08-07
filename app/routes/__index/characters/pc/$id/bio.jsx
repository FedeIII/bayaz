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
  switchShield,
  addCustomTreasure,
  changeCustomItemAmount,
  dropCustomItem,
  changeItemWeight,
  identifyItem,
} from '~/services/pc.server';
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
import { addItemToTreasure } from '~/domain/mutations/characterMutations';
import { getSessionUser } from '~/services/session.server';
import { isDm } from '~/domain/user';
import { useSearchResults } from '~/components/hooks/useSearchResults';
import NumericInput from '~/components/inputs/numeric';
import {
  renderItemName,
  renderItemNameWithAmount,
} from '~/domain/equipment/items';
import { ALL_SPELLS_BY_LEVEL } from '~/domain/spells/getSpells';
import { t } from '~/domain/translations';

import styles from '~/components/bio.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = ({ data }) => ({
  title: data.pc.name,
});

export const loader = async ({ request, params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('pc not found');
  }

  const user = await getSessionUser(request);

  return json({ pc, isDm: isDm(user) });
};

async function equipWeaponAction(formData) {
  const id = formData.get('id');
  const weaponName = formData.get('weaponName');
  const weaponSlot = formData.get('weaponSlot');

  return await equipWeaponInSlot(id, weaponName, weaponSlot);
}

async function identifyItemAction(formData) {
  const id = formData.get('id');
  const section = formData.get('section');
  const itemName = formData.get('itemName');
  const scrollSpellName = formData.get('scrollSpellName');

  return await identifyItem(
    id,
    section,
    itemName,
    scrollSpellName !== 'undefined' ? scrollSpellName : null
  );
}

async function dropWeaponAction(formData) {
  const id = formData.get('id');
  const weaponName = formData.get('weaponName');

  return await dropTreasureWeapon(id, weaponName);
}

async function equipShieldAction(formData) {
  const id = formData.get('id');
  const shieldName = formData.get('shieldName');

  return await switchShield(id, shieldName);
}

async function equipArmorAction(formData) {
  const id = formData.get('id');
  const armorName = formData.get('armorName');

  return await switchArmor(id, armorName);
}

async function dropShieldAction(formData) {
  const id = formData.get('id');
  const shieldName = formData.get('shieldName');

  return await dropTreasureArmor(id, shieldName);
}

async function dropArmorAction(formData) {
  const id = formData.get('id');
  const armorName = formData.get('armorName');

  return await dropTreasureArmor(id, armorName);
}

async function dropItemAction(formData) {
  const id = formData.get('id');
  const itemName = formData.get('itemName');
  const section = formData.get('section');
  const scrollSpellName = formData.get('scrollSpellName');

  if (section === 'custom') {
    return await dropCustomItem(id, itemName);
  } else {
    return await dropTreasureItem(id, itemName, scrollSpellName);
  }
}

async function changeAmountAction(formData) {
  const id = formData.get('id');
  const itemName = formData.get('itemName');
  const itemAmount = formData.get('itemAmount');
  const section = formData.get('section');

  if (section === 'custom') {
    return await changeCustomItemAmount(id, itemName, itemAmount);
  } else {
    return await changeTreasureItemAmount(id, itemName, itemAmount);
  }
}

async function changeWeightAction(formData) {
  const id = formData.get('id');
  const itemName = formData.get('itemName');
  const weight = formData.get('weight');
  const section = formData.get('section');

  return await changeItemWeight(id, itemName, weight, section);
}

async function addItemToTreasureAction(formData) {
  const id = formData.get('id');
  const itemName = formData.get('itemName');
  const itemAmount = formData.get('itemAmount');
  const scrollSpellLevel = formData.get('scrollSpellLevel');
  const scrollSpellName = formData.get('scrollSpellName');

  return await addItemToTreasure(
    id,
    itemName,
    itemAmount,
    scrollSpellLevel !== 'undefiend' ? parseInt(scrollSpellLevel, 10) : null,
    scrollSpellName !== 'undefined' ? scrollSpellName : null
  );
}

async function addArbitraryItemAction(formData) {
  const id = formData.get('id');
  const itemName = formData.get('itemName');

  return await addCustomTreasure(id, itemName);
}

async function updateFreeTextsAction(formData) {
  const id = formData.get('id');
  const fieldName = formData.get('fieldName');
  const text = formData.get('text');

  return await updatePc({
    id,
    [`freeText.${fieldName}`]: text,
  });
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const action = formData.get('action');

  let updatedPc = null;

  if (action === 'equipWeapon') {
    await equipWeaponAction(formData);
    return redirect(`/characters/pc/${id}/summary`);
  } else if (action === 'identifyItem') {
    updatedPc = await identifyItemAction(formData);
  } else if (action === 'dropWeapon') {
    updatedPc = await dropWeaponAction(formData);
  } else if (action === 'equipShield') {
    await equipShieldAction(formData);
    return redirect(`/characters/pc/${id}/summary`);
  } else if (action === 'equipArmor') {
    await equipArmorAction(formData);
    return redirect(`/characters/pc/${id}/summary`);
  } else if (action === 'dropShield') {
    updatedPc = await dropShieldAction(formData);
  } else if (action === 'dropArmor') {
    updatedPc = await dropArmorAction(formData);
  } else if (action === 'dropItem') {
    updatedPc = await dropItemAction(formData);
  } else if (action === 'changeAmount') {
    updatedPc = await changeAmountAction(formData);
  } else if (action === 'changeWeight') {
    updatedPc = await changeWeightAction(formData);
  } else if (action === 'addItemToTreasure') {
    updatedPc = await addItemToTreasureAction(formData);
  } else if (action === 'addArbitraryItem') {
    updatedPc = await addArbitraryItemAction(formData);
  } else if (action === 'textChange') {
    updatedPc = await updateFreeTextsAction(formData);
  }

  if (!updatedPc) {
    updatedPc = getPc(id);
  }

  return json({ pc: updatedPc });
};

function ItemModalContent(props) {
  const {
    pc,
    item: pItem,
    section,
    dropItem,
    identifyItem,
    changeAmount,
    changeWeight,
    addToTreasure,
    closeModal,
    setOnCloseModalCallback,
    isDm,
    isInventorySearchResults,
  } = props;

  const item = getItem(pItem);

  function onIdentifyClick(e) {
    const [itemName, itemSpellName] = e.target.value.split(':');
    identifyItem(pc.id, 'treasure.others', itemName, itemSpellName);
    closeModal();
  }

  function onDropClick(e) {
    const [itemName, itemSpellName] = e.target.value.split(':');
    dropItem(itemName, section, itemSpellName);
    closeModal();
  }

  const [amount, setAmount] = useState(item.amount);
  const [weight, setWeight] = useState(item.weight);
  const [spellName, setSpellName] = useState(item.spellName);
  const [spellLevel, setSpellLevel] = useState(String(item.subtype));

  function onAddToTreasureClick() {
    addToTreasure(item.name, amount, spellLevel, spellName);
    closeModal();
  }

  useEffect(() => {
    if (changeWeight || changeAmount) {
      setOnCloseModalCallback(() => {
        if (changeWeight && weight !== item.weight) {
          changeWeight(item.name, weight, section);
        }
        if (changeAmount && amount !== item.amount) {
          changeAmount(item.name, amount, section);
        }
      });
    }
  }, [
    setOnCloseModalCallback,
    weight,
    item.weight,
    changeWeight,
    item.name,
    section,
    amount,
    item.amount,
    changeAmount,
  ]);

  const itemDisplay = renderItemName(item);
  const itemDisplayWithAmount = renderItemNameWithAmount(item, isDm);

  return (
    <>
      <h3 className="inventory-item__action-modal-title">{itemDisplay}</h3>
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
              <NumericInput
                name="amount"
                min="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                styleName="inventory-item__amount-input"
              />
            </li>
          )}

          {item.type === 'scroll' && isDm && (
            <li>
              Nivel:{' '}
              <select
                className="bio__weapon-select"
                disabled={!isInventorySearchResults}
                onChange={e => setSpellLevel(e.target.value)}
              >
                {Array.from(Array(10), (_, i) => i).map(index => (
                  <option
                    value={index}
                    key={index}
                    selected={
                      Number.isInteger(item.subtype)
                        ? index == item.subtype
                        : index == 0
                    }
                  >
                    {index}
                  </option>
                ))}
              </select>
            </li>
          )}

          {item.type === 'scroll' && isDm && (
            <li>
              Conjuro:{' '}
              <select
                className="bio__weapon-select"
                disabled={!isInventorySearchResults}
                onChange={e => setSpellName(e.target.value)}
              >
                <option value="">-</option>
                {ALL_SPELLS_BY_LEVEL[spellLevel].map(spell => (
                  <option
                    value={spell.name}
                    key={spell.name}
                    selected={spell.name === item.spellName}
                  >
                    {t(spell.name)}
                  </option>
                ))}
              </select>
            </li>
          )}

          {!!changeAmount && (
            <li>
              Cantidad:{' '}
              <NumericInput
                name="amount"
                min="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                styleName="inventory-item__amount-input"
              />
            </li>
          )}

          {!!changeWeight && (
            <li>
              Peso{' '}
              <NumericInput
                name="weight"
                min="0"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                styleName="inventory-item__amount-input"
              />{' '}
              kg
            </li>
          )}

          {!!(
            isDm &&
            item.description &&
            !item.identified &&
            !isInventorySearchResults
          ) && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                value={
                  item.type === 'scroll'
                    ? `${item.name}:${item.spellName}`
                    : item.name
                }
                onClick={onIdentifyClick}
              >
                Identificar {itemDisplay}
              </button>
            </li>
          )}

          {!!dropItem && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                value={
                  item.type === 'scroll'
                    ? `${item.name}:${item.spellName}`
                    : item.name
                }
                onClick={onDropClick}
              >
                Tirar {itemDisplayWithAmount}
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

function WeaponModalContent(props) {
  const {
    pc,
    weapon,
    equipWeapon,
    identifyItem,
    dropWeapon,
    closeModal,
    isDm,
  } = props;

  const {
    items: { weapons },
  } = pc;

  function onEquipClick(e) {
    const slot = e.target.value;
    equipWeapon(weapon.name, slot);
    closeModal();
  }

  function onIdentifyClick(e) {
    const weaponName = e.target.value;
    identifyItem(pc.id, 'treasure.weapons', weaponName);
    closeModal();
  }

  function onDropClick(e) {
    const weaponName = e.target.value;
    dropWeapon(weaponName);
    closeModal();
  }

  const weaponDisplay = renderItemName(getItem(weapon));

  return (
    <>
      <h3 className="inventory-item__action-modal-title">{weaponDisplay}</h3>
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
                  {i}: {weapons[i] ? renderItemName(getItem(weapons[i])) : '-'}
                </option>
              ))}
            </select>
          </li>
          {!!(isDm && weapon.description && !weapon.identified) && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                value={weapon.name}
                onClick={onIdentifyClick}
              >
                Identificar {weaponDisplay}
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              className="inventory-item__drop-item-button"
              value={weapon.name}
              onClick={onDropClick}
            >
              Tirar {weaponDisplay}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function ArmorModalContent(props) {
  const { armor, pArmor, equipArmor, dropArmor, closeModal } = props;

  function onEquipClick() {
    equipArmor(armor.name);
    closeModal();
  }

  function onDropClick(e) {
    const armorName = e.target.value;
    dropArmor(armorName);
    closeModal();
  }

  const armorDisplay = renderItemName(getItem(pArmor));

  return (
    <>
      <h3 className="inventory-item__action-modal-title">
        {renderItemName(armor)}
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
                Equipar en lugar de {armorDisplay}
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
              Tirar {armorDisplay}
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
    id,
    name,
    age,
    height,
    weight,
    pack,
    items: { treasure = {} } = {},
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

  function onFormSubmit(e) {}

  const submit = useSubmit();

  function onTextChange(fieldName, text) {
    submit(
      {
        action: 'textChange',
        id,
        fieldName,
        text,
      },
      { method: 'post' }
    );
  }

  function equipWeapon(weaponName, weaponSlot) {
    submit(
      {
        action: 'equipWeapon',
        id,
        weaponName,
        weaponSlot,
      },
      { method: 'post' }
    );
  }

  function identifyItem(pcId, section, itemName, scrollSpellName) {
    submit(
      {
        action: 'identifyItem',
        id: pcId,
        section,
        itemName,
        scrollSpellName,
      },
      { method: 'post' }
    );
  }

  function dropWeapon(weaponName) {
    submit(
      {
        action: 'dropWeapon',
        id,
        weaponName,
      },
      { method: 'post' }
    );
  }

  function equipShield(shieldName) {
    submit(
      {
        action: 'equipShield',
        id,
        shieldName,
      },
      { method: 'post' }
    );
  }

  function equipArmor(armorName) {
    submit(
      {
        action: 'equipArmor',
        id,
        armorName,
      },
      { method: 'post' }
    );
  }

  function dropShield(shieldName) {
    submit(
      {
        action: 'dropShield',
        id,
        shieldName,
      },
      { method: 'post' }
    );
  }

  function dropArmor(armorName) {
    submit(
      {
        action: 'dropArmor',
        id,
        armorName,
      },
      { method: 'post' }
    );
  }

  function dropItem(itemName, section, scrollSpellName) {
    submit(
      {
        action: 'dropItem',
        id,
        itemName,
        section,
        scrollSpellName,
      },
      { method: 'post' }
    );
  }

  function changeAmount(itemName, itemAmount, section) {
    submit(
      {
        action: 'changeAmount',
        id,
        itemName,
        itemAmount,
        section,
      },
      { method: 'post' }
    );
  }

  function changeWeight(itemName, weight, section) {
    submit(
      {
        action: 'changeWeight',
        id,
        itemName,
        weight,
        section,
      },
      { method: 'post' }
    );
  }

  function addToTreasure(
    itemName,
    itemAmount,
    scrollSpellLevel,
    scrollSpellName
  ) {
    submit(
      {
        action: 'addItemToTreasure',
        id,
        itemName,
        itemAmount,
        scrollSpellLevel,
        scrollSpellName,
      },
      { method: 'post' }
    );
  }

  function addArbitraryItem() {
    setArbitraryItem('');
    submit(
      {
        action: 'addArbitraryItem',
        id,
        itemName: arbitraryItem,
      },
      { method: 'post' }
    );
  }

  const [actionModalContent, setActionModalContent] = useState(null);

  const [itemSearch, setItemSearch] = useState('');
  function onSearchChange(e) {
    setItemSearch(e.target.value);
  }

  const itemResults = useSearchResults(itemSearch, isDm, [
    'equipment',
  ]).equipment;

  const [itemRefs, setItemRefs] = useState({
    weapons: treasure.weapons.map(createRef),
    armors: treasure.armors.map(createRef),
    others: treasure.others.map(createRef),
    custom: treasure.custom.map(createRef),
    pack: getPackItems(pack).map(createRef),
    inventorySearchResults: itemResults.map(createRef),
  });

  useEffect(() => {
    setItemRefs({
      weapons: treasure.weapons.map(createRef),
      armors: treasure.armors.map(createRef),
      others: treasure.others.map(createRef),
      custom: treasure.custom.map(createRef),
      pack: getPackItems(pack).map(createRef),
      inventorySearchResults: itemResults.map(createRef),
    });
  }, [
    treasure.weapons.length,
    treasure.armors.length,
    treasure.others.length,
    treasure.custom.length,
    itemResults.length,
  ]);

  const [
    itemModalContent,
    closeItemModal,
    openItemModal,
    selectedItemRef,
    setSelectedItemRef,
    setOnCloseModalCallback,
  ] = useInventoryItems(pc, itemRefs, actionModalContent);

  const formRef = useRef(null);

  function onItemClick(itemType, itemIndex) {
    return pItem => {
      const item = getItem(pItem);

      setSelectedItemRef(itemRefs[itemType][itemIndex]);

      let content;
      if (itemType === 'custom') {
        content = props => (
          <ItemModalContent
            pc={pc}
            item={item}
            section={itemType}
            dropItem={dropItem}
            changeAmount={changeAmount}
            changeWeight={changeWeight}
            closeModal={() => setActionModalContent(null)}
            setOnCloseModalCallback={setOnCloseModalCallback}
          />
        );
      } else if (itemType === 'others') {
        content = props => (
          <ItemModalContent
            pc={pc}
            item={item}
            section={itemType}
            dropItem={dropItem}
            identifyItem={identifyItem}
            changeAmount={changeAmount}
            closeModal={() => setActionModalContent(null)}
            setOnCloseModalCallback={setOnCloseModalCallback}
            isDm={isDm}
          />
        );
      } else if (itemType === 'inventorySearchResults') {
        content = props => (
          <ItemModalContent
            item={item}
            addToTreasure={addToTreasure}
            closeModal={() => setActionModalContent(null)}
            setOnCloseModalCallback={setOnCloseModalCallback}
            isDm={isDm}
            isInventorySearchResults
          />
        );
      } else if (item.type === 'weapon') {
        content = props => (
          <WeaponModalContent
            pc={pc}
            weapon={item}
            equipWeapon={equipWeapon}
            identifyItem={identifyItem}
            dropWeapon={dropWeapon}
            closeModal={() => setActionModalContent(null)}
            isDm={isDm}
          />
        );
      } else if (item.type === 'armor') {
        if (item.subtype === 'shield') {
          content = props => (
            <ArmorModalContent
              armor={item}
              pArmor={pc.items.equipment.shield}
              equipArmor={equipShield}
              dropArmor={dropShield}
              closeModal={() => setActionModalContent(null)}
            />
          );
        } else {
          content = props => (
            <ArmorModalContent
              armor={item}
              pArmor={pc.items.equipment.armor}
              equipArmor={equipArmor}
              dropArmor={dropArmor}
              closeModal={() => setActionModalContent(null)}
            />
          );
        }
      }

      setActionModalContent(() => content);
    };
  }

  const [isTreasureScreenOpen, setIsTreasureScreenOpen] = useState(false);
  function openTreasureScreen() {
    setIsTreasureScreenOpen(true);
  }
  function closeTreasureScreen() {
    setIsTreasureScreenOpen(false);
  }

  const [arbitraryItem, setArbitraryItem] = useState('');
  function onOtherItemChange(e) {
    setArbitraryItem(e.target.value);
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
        <input readOnly type="text" name="id" value={id} hidden />

        {/* MODALS */}
        {actionModalContent && (
          <ItemModal
            elRef={selectedItemRef}
            formRef={formRef}
            closeModal={() => {
              closeItemModal();
              setActionModalContent(null);
            }}
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
          onBlur={e => onTextChange('eyes', e.target.value)}
        ></textarea>
        <textarea
          className="bio__data bio__skin"
          name="skin"
          defaultValue={skin}
          onBlur={e => onTextChange('skin', e.target.value)}
        ></textarea>
        <textarea
          className="bio__data bio__hair"
          name="hair"
          defaultValue={hair}
          onBlur={e => onTextChange('hair', e.target.value)}
        ></textarea>

        {/* FREE TEXT */}
        <textarea
          className="bio__data bio__allies"
          name="allies"
          defaultValue={allies}
          onBlur={e => onTextChange('allies', e.target.value)}
        ></textarea>

        <textarea
          className="bio__data bio__backstory"
          name="backstory"
          defaultValue={backstory}
          onBlur={e => onTextChange('backstory', e.target.value)}
        ></textarea>

        <textarea
          className="bio__data bio__extra-traits1"
          name="extraTraits1"
          defaultValue={extraTraits1}
          onBlur={e => onTextChange('extraTraits1', e.target.value)}
        ></textarea>
        <textarea
          className="bio__data bio__extra-traits2"
          name="extraTraits2"
          defaultValue={extraTraits2}
          onBlur={e => onTextChange('extraTraits2', e.target.value)}
        ></textarea>

        {/* TREASURE */}
        <div className="bio__data bio__treasure">
          <ul className="bio__treasure-list">
            {!!treasure.weapons.length && (
              <li className="bio__treasure-item">
                <u>Armas:</u>{' '}
                {treasure.weapons.map((treasureWeapon, i) => (
                  <InventoryItem
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
              <li className="bio__treasure-item">
                <u>Armaduras:</u>{' '}
                {treasure.armors.map((treasureArmor, i) => (
                  <InventoryItem
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
              <li className="bio__treasure-item">
                {treasure.others.map((treasureItem, i) => (
                  <InventoryItem
                    ref={itemRefs.others[i]}
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
            {!!treasure.custom.length && (
              <li className="bio__treasure-item">
                {treasure.custom.map((treasureItem, i) => (
                  <InventoryItem
                    ref={itemRefs.custom[i]}
                    pItem={treasureItem}
                    isLast={i === treasure.custom.length - 1}
                    onItemClick={onItemClick('custom', i)}
                    openModal={openItemModal('custom', i)}
                    closeModal={closeItemModal}
                    key={treasureItem.name}
                  />
                ))}
              </li>
            )}
            <li className="bio__treasure-item">
              <input
                type="text"
                name="otherItem"
                value={arbitraryItem}
                onChange={onOtherItemChange}
                className="bio__other-item-input"
              />
              {!!arbitraryItem && (
                <span
                  className="bio__add-other-item bio__add-other-item--animated"
                  onClick={addArbitraryItem}
                >
                  +
                </span>
              )}
            </li>
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
              Buscar Items{' '}
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
                    ref={itemRefs.inventorySearchResults[i]}
                    pItem={item}
                    isDm={isDm}
                    isLast
                    onItemClick={onItemClick('inventorySearchResults', i)}
                    openModal={openItemModal('inventorySearchResults', i)}
                    closeModal={closeItemModal}
                    dontCloseOnMouseOut
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
