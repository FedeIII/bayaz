import { useContext, useMemo, useState } from 'react';

import { InventoryItem } from '../modal/inventoryItem';
import { getItem } from '~/domain/equipment/equipment';
import { t } from '~/domain/translations';
import MagicItemsContext from '../contexts/magicItemsContext';
import { hasActions } from '~/domain/equipment/items';
import NumericInput from '../inputs/numeric';

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
                className="inventory-item__amount-input"
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
                className="inventory-item__amount-input"
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
  const { money } = pc;

  const allMagicItems = useContext(MagicItemsContext);

  const [equipment = {}, treasure = {}] = useMemo(() => {
    return !!allMagicItems?.length
      ? [pc.items.equipment, pc.items.treasure]
      : [];
  }, [allMagicItems, pc.items.equipment, pc.items.treasure]);

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

      setSelectedItemRef(itemRefs[itemType].current[itemIndex]);

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

      setSelectedItemRef(itemRefs.ammunition.current[itemIndex]);

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
        setSelectedItemRef(itemRefs.others.current[itemIndex]);

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
                ref={itemRefs.ammunition.current[i]}
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
                ref={itemRefs.others.current[i]}
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
            <span className="sheet__add-other-item" onClick={addArbitraryItem}>
              +
            </span>
          )}
        </li>
      </ul>

      <div className="sheet__data sheet__copper">
        <NumericInput
          defaultValue={money.cp}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('cp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__silver">
        <NumericInput
          defaultValue={money.sp}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('sp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__electrum">
        <NumericInput
          defaultValue={money.ep}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('ep', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__gold">
        <NumericInput
          defaultValue={money.gp}
          min="0"
          className="sheet__coin-input"
          onChange={e => onMoneyChange('gp', e.target.value)}
        />
      </div>
      <div className="sheet__data sheet__platinum">
        <NumericInput
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
