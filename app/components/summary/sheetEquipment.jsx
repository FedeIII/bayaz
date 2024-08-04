import { useState } from 'react';

import { InventoryItem } from '../modal/inventoryItem';
import { getItem } from '~/domain/equipment/equipment';
import { t } from '~/domain/translations';
import { hasActions } from '~/domain/equipment/items';
import NumericInput from '../inputs/numeric';
import {
  addOtherEquipment,
  changeEquipmentAmmoAmount,
  changeEquipmentOtherAmount,
  dropEquipmentAmmo,
  dropEquipmentOther,
  getPc,
  switchArmor,
  switchShield,
  unequipArmor,
  unequipShield,
  updatePc,
} from '~/services/pc.server';
import { changeMagicCharges, useCharge } from '~/services/item.server';

const noOp = () => {};

export const actions = {
  equipShield: async formData => {
    const id = formData.get('id');
    const newShieldName = formData.get('newShieldName');

    return await switchShield(id, newShieldName);
  },

  equipArmor: async formData => {
    const id = formData.get('id');
    const newArmorName = formData.get('newArmorName');

    return await switchArmor(id, newArmorName);
  },

  unequipShield: async formData => {
    const id = formData.get('id');
    const shieldName = formData.get('shieldName');

    return await unequipShield(id, shieldName);
  },

  unequipArmor: async formData => {
    const id = formData.get('id');
    const armorName = formData.get('armorName');

    return await unequipArmor(id, armorName);
  },

  dropAmmo: async formData => {
    const id = formData.get('id');
    const itemName = formData.get('itemName');

    await dropEquipmentAmmo(id, itemName);
  },

  dropOther: async formData => {
    const id = formData.get('id');
    const itemName = formData.get('itemName');

    await dropEquipmentOther(id, itemName);
  },

  useCharge: async formData => {
    const id = formData.get('id');
    const itemId = formData.get('itemId');

    await useCharge(itemId);

    return await getPc(id);
  },

  changeAmmoAmount: async formData => {
    const id = formData.get('id');
    const itemName = formData.get('itemName');
    const itemAmount = formData.get('itemAmount');

    await changeEquipmentAmmoAmount(id, itemName, itemAmount);
  },

  changeOtherAmount: async formData => {
    const id = formData.get('id');
    const itemName = formData.get('itemName');
    const itemAmount = formData.get('itemAmount');

    await changeEquipmentOtherAmount(id, itemName, itemAmount);
  },

  changeMagicCharges: async formData => {
    const id = formData.get('id');
    const itemId = formData.get('itemId');
    const charges = formData.get('charges');

    await changeMagicCharges(itemId, charges);

    return await getPc(id);
  },

  changeMoney: async formData => {
    const id = formData.get('id');
    const coin = formData.get('coin');
    const amount = formData.get('amount');

    return await updatePc({ id, [`money.${coin}`]: amount });
  },

  addArbitraryItem: async formData => {
    const id = formData.get('id');
    const itemName = formData.get('itemName');

    return await addOtherEquipment(id, itemName);
  },
};

function ArmorModalContent(props) {
  const { pc, armor, onArmorChange, unequipArmor, closeModal } = props;
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

  function onUnequipClick(e) {
    const armorName = e.target.value;
    unequipArmor(armorName);
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
            Cambiar por:{' '}
            <select className="sheet__select-attack" onChange={onEquipClick}>
              <option value={armor.name}>{armor.translation}</option>
              {armors
                .filter(armor => armor.name !== 'shield')
                .map(extraArmor => (
                  <option value={extraArmor.name} key={extraArmor.name}>
                    {t(extraArmor.name)}
                  </option>
                ))}
            </select>
          </li>
          <li>
            <button
              type="button"
              className="inventory-item__drop-item-button"
              value={armor.name}
              onClick={onUnequipClick}
            >
              Desequipar {armor.translation}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function ItemModalContent(props) {
  const { item, dropItem, useItem, changeAmount, changeCharges, closeModal } =
    props;

  function onDropClick() {
    dropItem(item);
    closeModal();
  }

  function onUseClick() {
    useItem(item);
    closeModal();
  }

  const [amount, setAmount] = useState(item.amount);
  function onChangeAmountClick() {
    changeAmount(item.name, amount);
    closeModal();
  }

  const [charges, setCharges] = useState(item.charges);
  function onChangeChargesClick() {
    changeCharges(item.id, charges);
    closeModal();
  }

  return (
    <>
      <h3 className="inventory-item__action-modal-title">
        {item.translation || item.name}
      </h3>
      <span className="inventory-item__modal-close" onClick={closeModal}>
        ⨉
      </span>
      <div className="inventory-item__modal-content">
        <ul className="inventory-item__modal-options">
          {!!changeAmount && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                onClick={onChangeAmountClick}
              >
                Cambiar cantidad
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

          {!!(changeCharges && item.charges) && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                onClick={onChangeChargesClick}
              >
                Cambiar cargas
              </button>{' '}
              <NumericInput
                name="amount"
                min="0"
                max={item.maxCharges}
                value={charges}
                onChange={e => setCharges(e.target.value)}
                styleName="inventory-item__amount-input"
              />
            </li>
          )}

          {!!dropItem && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                onClick={onDropClick}
              >
                Tirar {item.translation}
              </button>
            </li>
          )}

          {!!useItem && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                onClick={onUseClick}
              >
                Usar {item.translation}
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

function SheetEquipment(props) {
  const {
    pc,
    itemRefs,
    openItemModal,
    closeItemModal,
    setSelectedItemRef,
    setActionModalContent,
    submit,
  } = props;
  const { money, items: { equipment = {}, treasure = {} } = {} } = pc;

  function onShieldChange(newShieldName) {
    submit(
      {
        action: 'equipShield',
        id: pc.id,
        newShieldName,
      },
      { method: 'post' }
    );
  }

  function onArmorChange(newArmorName) {
    submit(
      {
        action: 'equipArmor',
        id: pc.id,
        newArmorName,
      },
      { method: 'post' }
    );
  }

  function unequipShield(shieldName) {
    submit(
      {
        action: 'unequipShield',
        id: pc.id,
        shieldName,
      },
      { method: 'post' }
    );
  }

  function unequipArmor(armorName) {
    submit(
      {
        action: 'unequipArmor',
        id: pc.id,
        armorName,
      },
      { method: 'post' }
    );
  }

  function onMoneyChange(coin, amount) {
    submit(
      {
        action: 'changeMoney',
        id: pc.id,
        coin,
        amount,
      },
      { method: 'post' }
    );
  }

  function dropAmmo(item) {
    submit(
      {
        action: 'dropAmmo',
        id: pc.id,
        itemName: item.name,
      },
      { method: 'post' }
    );
  }

  function dropOther(item) {
    submit(
      {
        action: 'dropOther',
        id: pc.id,
        itemName: item.name,
      },
      { method: 'post' }
    );
  }

  function useCharge(item) {
    submit(
      {
        action: 'useCharge',
        id: pc.id,
        itemId: item.id,
      },
      { method: 'post' }
    );
  }

  function changeAmmoAmount(itemName, itemAmount) {
    submit(
      {
        action: 'changeAmmoAmount',
        id: pc.id,
        itemName,
        itemAmount,
      },
      { method: 'post' }
    );
  }

  function changeOtherAmount(itemName, itemAmount) {
    submit(
      {
        action: 'changeOtherAmount',
        id: pc.id,
        itemName,
        itemAmount,
      },
      { method: 'post' }
    );
  }

  function changeMagicCharges(itemId, charges) {
    submit(
      {
        action: 'changeMagicCharges',
        id: pc.id,
        itemId,
        charges,
      },
      { method: 'post' }
    );
  }

  function addArbitraryItem() {
    setArbitraryItem('');
    submit(
      {
        action: 'addArbitraryItem',
        id: pc.id,
        itemName: arbitratyItem,
      },
      { method: 'post' }
    );
  }

  function onArmorClick(itemType, itemIndex = 0) {
    return itemName => {
      const item = getItem(itemName);

      setSelectedItemRef(itemRefs[itemType][itemIndex]);

      setTimeout(
        () =>
          setActionModalContent(() => props => (
            <ArmorModalContent
              pc={pc}
              armor={item}
              onArmorChange={
                itemType === 'shield' ? onShieldChange : onArmorChange
              }
              unequipArmor={
                itemType === 'shield' ? unequipShield : unequipArmor
              }
              closeModal={() => setActionModalContent(null)}
            />
          )),
        0
      );
    };
  }

  function onAmmoClick(itemIndex = 0) {
    return itemName => {
      const item = getItem(itemName);

      setSelectedItemRef(itemRefs.ammunition[itemIndex]);

      setTimeout(
        () =>
          setActionModalContent(() => props => (
            <ItemModalContent
              item={item}
              dropItem={dropAmmo}
              changeAmount={changeAmmoAmount}
              closeModal={() => setActionModalContent(null)}
            />
          )),
        0
      );
    };
  }

  function onMagicItemClick(itemIndex = 0) {
    return itemName => {
      const item = getItem(itemName);
      if (hasActions(item)) {
        setSelectedItemRef(itemRefs.others[itemIndex]);

        const useItem = item.consumable
          ? dropOther
          : item.charges !== null
          ? useCharge
          : noOp;

        setTimeout(
          () =>
            setActionModalContent(() => props => (
              <ItemModalContent
                item={item}
                changeAmount={changeOtherAmount}
                dropItem={dropOther}
                useItem={useItem}
                changeCharges={changeMagicCharges}
                closeModal={() => setActionModalContent(null)}
              />
            )),
          0
        );
      }
    };
  }

  const [arbitratyItem, setArbitraryItem] = useState('');

  function onOtherItemChange(e) {
    setArbitraryItem(e.target.value);
  }

  return (
    <>
      <ul className="sheet__data sheet__equipment">
        {!!equipment.armor && (
          <li>
            <u>Armadura:</u>{' '}
            <InventoryItem
              ref={itemRefs.armor[0]}
              pItem={equipment.armor}
              isLast
              onItemClick={
                !!treasure.armors.length ? onArmorClick('armor') : noOp
              }
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
              onItemClick={
                !!treasure.armors.length ? onArmorClick('shield') : noOp
              }
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
                onItemClick={onAmmoClick(i)}
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
                key={otherItem.name}
                ref={itemRefs.others[i]}
                pItem={otherItem}
                isLast={i === equipment.others.length - 1}
                onItemClick={onMagicItemClick(i)}
                openModal={openItemModal('others', i)}
                closeModal={closeItemModal}
              />
            ))}
          </li>
        )}
        <li>
          <input
            type="text"
            name="otherItem"
            value={arbitratyItem}
            onChange={onOtherItemChange}
            className="sheet__other-item-input"
          />
          {!!arbitratyItem && (
            <span
              className="sheet__add-other-item sheet__add-other-item--animated"
              onClick={addArbitraryItem}
            >
              +
            </span>
          )}
        </li>
      </ul>

      <div className="sheet__data sheet__copper">
        <NumericInput
          defaultValue={money.cp}
          min="0"
          styleName="sheet__coin-input"
          onChange={e => onMoneyChange('cp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__silver">
        <NumericInput
          defaultValue={money.sp}
          min="0"
          styleName="sheet__coin-input"
          onChange={e => onMoneyChange('sp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__electrum">
        <NumericInput
          defaultValue={money.ep}
          min="0"
          styleName="sheet__coin-input"
          onChange={e => onMoneyChange('ep', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__gold">
        <NumericInput
          defaultValue={money.gp}
          min="0"
          styleName="sheet__coin-input"
          onChange={e => onMoneyChange('gp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__platinum">
        <NumericInput
          defaultValue={money.pp}
          min="0"
          styleName="sheet__coin-input"
          onChange={e => onMoneyChange('pp', e.target.value)}
        />
      </div>
    </>
  );
}

export default SheetEquipment;
