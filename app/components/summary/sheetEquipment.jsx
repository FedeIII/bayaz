import { useState } from 'react';

import { InventoryItem } from '../modal/inventoryItem';
import { getItem } from '~/domain/equipment/equipment';
import { t } from '~/domain/translations';

const noOp = () => {};

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
              {armors.map(extraArmor => (
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
  const { item, dropItem, changeAmount, closeModal } = props;

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

  return (
    <>
      <h3 className="inventory-item__action-modal-title">{item.translation}</h3>
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

function SheetEquipment(props) {
  const {
    pc,
    pcName,
    itemRefs,
    openItemModal,
    closeItemModal,
    setSelectedItemRef,
    setActionModalContent,
    submit,
  } = props;
  const {
    items: { equipment, treasure },
    money,
  } = pc;

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

  function unequipArmor(armorName) {
    submit(
      {
        action: 'unequipArmor',
        name: pcName,
        armorName,
      },
      { method: 'post' }
    );
  }

  function onMoneyChange(coin, amount) {
    submit(
      {
        action: 'changeMoney',
        name: pcName,
        coin,
        amount,
      },
      { method: 'post' }
    );
  }

  function dropAmmo(itemName) {
    submit(
      {
        action: 'dropAmmo',
        name: pc.name,
        itemName,
      },
      { method: 'post' }
    );
  }

  function changeAmmoAmount(itemName, itemAmount) {
    submit(
      {
        action: 'changeAmmoAmount',
        name: pc.name,
        itemName,
        itemAmount,
      },
      { method: 'post' }
    );
  }

  function onArmorClick(itemType, itemIndex = 0) {
    return itemName => {
      const item = getItem(itemName);

      setSelectedItemRef(itemRefs[itemType].current[itemIndex]);

      setTimeout(
        () =>
          setActionModalContent(() => props => (
            <ArmorModalContent
              pc={pc}
              armor={item}
              onArmorChange={onArmorChange}
              unequipArmor={unequipArmor}
              closeModal={() => setActionModalContent(null)}
            />
          )),
        0
      );
    };
  }

  function onAmmoClick(itemType, itemIndex = 0) {
    return itemName => {
      const item = getItem(itemName);

      setSelectedItemRef(itemRefs[itemType].current[itemIndex]);

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

  return (
    <>
      <ul className="sheet__data sheet__equipment">
        {!!equipment.armor && (
          <li>
            <u>Armadura:</u>{' '}
            <InventoryItem
              ref={itemRefs.armor.current[0]}
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
              ref={itemRefs.shield.current[0]}
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
                ref={itemRefs.ammunition.current[i]}
                pItem={ammo}
                isLast={i === equipment.ammunition.length - 1}
                onItemClick={onAmmoClick('ammunition', i)}
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
                ref={itemRefs.others.current[i]}
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

      <div className="sheet__data sheet__copper">
        <input
          type="number"
          defaultValue={money.cp}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('cp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__silver">
        <input
          type="number"
          defaultValue={money.sp}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('sp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__electrum">
        <input
          type="number"
          defaultValue={money.ep}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('ep', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__gold">
        <input
          type="number"
          defaultValue={money.gp}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('gp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__platinum">
        <input
          type="number"
          defaultValue={money.pp}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('pp', e.target.value)}
        />
      </div>
    </>
  );
}

export default SheetEquipment;
