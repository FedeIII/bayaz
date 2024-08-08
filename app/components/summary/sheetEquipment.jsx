import { useEffect, useState } from 'react';

import { InventoryItem } from '../modal/inventoryItem';
import { getItem } from '~/domain/equipment/equipment';
import { t } from '~/domain/translations';
import {
  getSectionPath,
  hasActions,
  renderItemName,
} from '~/domain/equipment/items';
import NumericInput from '../inputs/numeric';
import {
  addOtherEquipment,
  changeEquipmentAmmoAmount,
  changeEquipmentOtherAmount,
  changeItemCharges,
  dropEquipmentAmmo,
  dropEquipmentOther,
  identifyItem,
  switchArmor,
  switchShield,
  unequipArmor,
  unequipShield,
  updatePc,
} from '~/services/pc.server';

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

  identifyItem: async formData => {
    const id = formData.get('id');
    const section = formData.get('section');
    const itemName = formData.get('itemName');
    const itemSpellName = formData.get('itemSpellName');

    return await identifyItem(
      id,
      section,
      itemName,
      itemSpellName !== 'undefined' ? itemSpellName : null
    );
  },

  changeCharges: async formData => {
    const id = formData.get('id');
    const itemName = formData.get('itemName');
    const newCharges = formData.get('newCharges');
    const sectionPath = formData.get('sectionPath');

    return await changeItemCharges(id, itemName, newCharges, sectionPath);
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

  const armorDisplay = renderItemName(getItem(armor));

  return (
    <>
      <h3 className="inventory-item__action-modal-title">{armorDisplay}</h3>
      <span className="inventory-item__modal-close" onClick={closeModal}>
        ⨉
      </span>
      <div className="inventory-item__modal-content">
        <ul className="inventory-item__modal-options">
          <li>
            Cambiar por:{' '}
            <select className="sheet__select-attack" onChange={onEquipClick}>
              <option value={armor.name}>{armorDisplay}</option>
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
              Desequipar {armorDisplay}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function ItemModalContent(props) {
  const {
    item,
    pc,
    dropItem,
    changeAmount,
    closeModal,
    identifyItem,
    changeCharges,
    setOnCloseModalCallback,
    isDm,
  } = props;

  function onDropClick() {
    dropItem(item);
    closeModal();
  }

  function onIdentifyClick(e) {
    const [itemName, itemSpellName] = e.target.value.split(':');
    identifyItem(
      pc.id,
      getSectionPath(getItem(itemName)),
      itemName,
      itemSpellName
    );
    closeModal();
  }

  const [amount, setAmount] = useState(item.amount);
  const [chargesLeft, setChargesLeft] = useState(
    Number.isInteger(item.chargesLeft) ? item.chargesLeft : item.maxCharges
  );

  useEffect(() => {
    setOnCloseModalCallback(() => {
      if (amount !== item.amount) {
        changeAmount(item.name, amount);
      }
      if (item.maxCharges && chargesLeft !== item.chargesLeft) {
        changeCharges(item.name, chargesLeft, getSectionPath(item));
      }
    });
  }, [
    setOnCloseModalCallback,
    amount,
    item.amount,
    item.name,
    changeAmount,
    item.maxCharges,
    chargesLeft,
    item.chargesLeft,
    changeCharges,
    getSectionPath,
    item,
  ]);

  const itemName = renderItemName(getItem(item));

  return (
    <>
      <h3 className="inventory-item__action-modal-title">{itemName}</h3>
      <span className="inventory-item__modal-close" onClick={closeModal}>
        ⨉
      </span>
      <div className="inventory-item__modal-content">
        <ul className="inventory-item__modal-options">
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

          {!!(item.maxCharges && (item.identified || isDm)) && (
            <li>
              Cargas:{' '}
              <NumericInput
                onKeyDown="return false"
                max={item.maxCharges}
                min="0"
                value={chargesLeft}
                onChange={e => setChargesLeft(e.target.value)}
                styleName="inventory-item__amount-input"
              />
            </li>
          )}

          {!!(isDm && item.description && !item.identified) && (
            <li>
              <button
                type="button"
                className="sheet__select-attack"
                value={
                  item.type === 'scroll'
                    ? `${item.name}:${item.spellName}`
                    : item.name
                }
                onClick={onIdentifyClick}
              >
                Identificar {itemName}
              </button>
            </li>
          )}

          {!!dropItem && (
            <li>
              <button
                type="button"
                className="inventory-item__drop-item-button"
                onClick={onDropClick}
              >
                Quitar {itemName}
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
    setOnCloseModalCallback,
    submit,
    isDm,
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

  function identifyItem(pcId, section, itemName, itemSpellName) {
    submit(
      {
        action: 'identifyItem',
        id: pcId,
        section,
        itemName,
        itemSpellName,
      },
      { method: 'post' }
    );
  }

  function changeCharges(itemName, newCharges, sectionPath) {
    submit(
      {
        action: 'changeCharges',
        id: pc.id,
        itemName,
        newCharges,
        sectionPath,
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
              pc={pc}
              dropItem={dropAmmo}
              changeAmount={changeAmmoAmount}
              identifyItem={identifyItem}
              closeModal={() => setActionModalContent(null)}
              setOnCloseModalCallback={setOnCloseModalCallback}
              isDm={isDm}
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

        setTimeout(
          () =>
            setActionModalContent(() => props => (
              <ItemModalContent
                item={item}
                pc={pc}
                changeAmount={changeOtherAmount}
                dropItem={dropOther}
                identifyItem={identifyItem}
                changeCharges={changeCharges}
                closeModal={() => setActionModalContent(null)}
                setOnCloseModalCallback={setOnCloseModalCallback}
                isDm={isDm}
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
