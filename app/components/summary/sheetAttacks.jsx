import { Fragment, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';

import { getExtraWeapons, hasExtraWeapons } from '~/domain/characters';
import { getAnyItem, noItem } from '~/domain/equipment/equipment';
import { getAttacks, getSpecialAttacks, increment } from '~/domain/display';
import { InventoryItem } from '../modal/inventoryItem';
import { SkillItem } from '../modal/skillItem';
import { t } from '~/domain/translations';
import NumericInput from '../inputs/numeric';
import {
  equipWeapons,
  getPc,
  reorderWeapons,
  unequipWeapon,
} from '~/services/pc.server';
import { changeMagicCharges, useCharge } from '~/services/item.server';

const noAttack = { weapon: noItem() };

export const actions = {
  equipWeapons: async formData => {
    const oldWeaponName = formData.get('oldWeaponName');
    const newWeaponName = formData.get('newWeaponName');
    const id = formData.get('id');

    return await equipWeapons(id, oldWeaponName, newWeaponName);
  },

  unequipWeapon: async formData => {
    const id = formData.get('id');
    const weaponName = formData.get('weaponName');

    return await unequipWeapon(id, weaponName);
  },

  useMagicWeapon: async formData => {
    const id = formData.get('id');
    const weaponId = formData.get('weaponId');

    await useCharge(weaponId);

    return await getPc(id);
  },

  setMagicWeaponCharges: async formData => {
    const id = formData.get('id');
    const weaponId = formData.get('weaponId');
    const charges = formData.get('charges');

    await changeMagicCharges(weaponId, charges);

    return await getPc(id);
  },

  reorderWeapons: async formData => {
    const id = formData.get('id');
    const weaponName = formData.get('weaponName');
    const weaponSlot = formData.get('weaponSlot');

    return await reorderWeapons(id, weaponName, weaponSlot);
  },
};

function WeaponModalContent(props) {
  const {
    pc,
    weapon,
    onWeaponChange,
    onWeaponUnequip,
    onUseItem,
    onSetItemCharges,
    closeModal,
  } = props;

  function onEquipClick(e) {
    const newWeaponName = e.target.value;
    onWeaponChange(newWeaponName);
    closeModal();
  }

  function onUnequipClick() {
    onWeaponUnequip();
    closeModal();
  }

  function onUseItemClick() {
    onUseItem();
    closeModal();
  }

  function onSetItemChargesClick() {
    onSetItemCharges(charges);
    closeModal();
  }

  const [charges, setCharges] = useState(weapon.charges);

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
            Cambiar por:{' '}
            <select
              className="sheet__select-attack"
              disabled={!hasExtraWeapons(pc)}
              onChange={onEquipClick}
            >
              <option value={weapon.name}>{weapon.translation}</option>
              {getExtraWeapons(pc).map(extraWeapon => (
                <option value={extraWeapon.name} key={extraWeapon.name}>
                  {t(extraWeapon.name)}
                </option>
              ))}
            </select>
          </li>

          <li>
            <button
              type="button"
              className="sheet__select-attack"
              onClick={onUnequipClick}
            >
              Desequipar
            </button>
          </li>

          {!!onUseItem && (
            <li>
              <button
                type="button"
                className="sheet__select-attack"
                onClick={onUseItemClick}
              >
                Usar {weapon.translation}
              </button>
            </li>
          )}

          {!!onSetItemCharges && (
            <li>
              <button
                type="button"
                className="sheet__select-attack"
                onClick={() => onSetItemChargesClick(charges)}
              >
                Cambiar cargas
              </button>{' '}
              <NumericInput
                name="charges"
                min="0"
                max={weapon.maxCharges}
                value={charges}
                onChange={e => setCharges(e.target.value)}
                styleName="inventory-item__amount-input"
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

function SheetAttacks(props) {
  const {
    pc,
    itemRefs,
    setSelectedItemRef,
    setActionModalContent,
    openItemModal,
    closeItemModal,
    skillRefs,
    openSkillModal,
    submit,
  } = props;

  const [weaponsLoading, setWeaponsLoading] = useState([false, false, false]);
  const [weaponsState, setWeaponsState] = useState(pc.items.weapons);
  const [attacks, setAttacks] = useState([noAttack, noAttack, noAttack]);

  useEffect(() => {
    const newWeaponsState = pc.items.weapons.map(w => ({ name: w?.name }));
    setWeaponsState(newWeaponsState);
    setWeaponsLoading([false, false, false]);
    if (newWeaponsState.length) {
      const newAttacks = getAttacks(pc, newWeaponsState);
      setAttacks(newAttacks);
    }
  }, [pc]);

  function onWeaponChange(i) {
    return newWeaponName => {
      submit(
        {
          action: 'equipWeapons',
          id: pc.id,
          oldWeaponName: weaponsState[i].name,
          newWeaponName,
        },
        { method: 'post' }
      );
    };
  }

  function onWeaponUnequip(i) {
    return () => {
      submit(
        {
          action: 'unequipWeapon',
          id: pc.id,
          weaponName: weaponsState[i].name,
        },
        { method: 'post' }
      );
    };
  }

  function onUseMagicWeapon(weaponId) {
    return () => {
      submit(
        {
          action: 'useMagicWeapon',
          id: pc.id,
          weaponId,
        },
        { method: 'post' }
      );
    };
  }

  function onSetMagicWeaponCharges(weaponId) {
    return charges => {
      submit(
        {
          action: 'setMagicWeaponCharges',
          id: pc.id,
          weaponId,
          charges,
        },
        { method: 'post' }
      );
    };
  }

  function onWeaponDrop(weaponName, weaponSlot) {
    getAnyItem(weaponName).then(selectedWeapon => {
      setWeaponsState(w => {
        const newW = w.slice();

        const originSlot = newW.findIndex(
          weapon => weapon?.name === weaponName
        );
        const replacedWeapon = newW[weaponSlot];

        newW[originSlot] = replacedWeapon;
        newW[weaponSlot] = selectedWeapon;

        if (originSlot !== weaponSlot) {
          setWeaponsLoading(l => {
            const newL = l.slice();
            newL[originSlot] = true;
            newL[weaponSlot] = true;
            return newL;
          });
        }

        return newW;
      });
    });

    submit(
      {
        action: 'reorderWeapons',
        id: pc.id,
        weaponName,
        weaponSlot,
      },
      { method: 'post' }
    );
  }

  function onWeaponClick(itemType, itemIndex = 0) {
    return itemName => {
      getAnyItem(itemName).then(item => {
        setSelectedItemRef(itemRefs[itemType].current[itemIndex]);
        setTimeout(
          () =>
            setActionModalContent(() => props => (
              <WeaponModalContent
                pc={pc}
                weapon={item}
                onWeaponChange={onWeaponChange(itemIndex)}
                onWeaponUnequip={onWeaponUnequip(itemIndex)}
                onUseItem={item.charges && onUseMagicWeapon(item.id)}
                onSetItemCharges={
                  !!item.maxCharges && onSetMagicWeaponCharges(item.id)
                }
                closeModal={() => setActionModalContent(null)}
              />
            )),
          0
        );
      });
    };
  }

  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <>
      {attacks.map((attack, slot) => {
        const [_1, drag] = useDrag(
          () => ({
            type: 'WEAPON',
            item: { value: attack.weapon.name },
            canDrag: () => !!attack.weapon.name && !weaponsLoading[slot],
          }),
          [attack.weapon.name, weaponsLoading[slot]]
        );

        const [{ isOver, canDrop }, drop] = useDrop(
          () => ({
            accept: 'WEAPON',
            drop: item => onWeaponDrop(item.value, slot),
            canDrop: () => !weaponsLoading[slot],
            collect: monitor => ({
              isOver: !!monitor.isOver(),
              canDrop: !!monitor.canDrop(),
            }),
          }),
          [attack.weapon.name, weaponsLoading[slot]]
        );

        const onHandleClick = () => {
          if (selectedSlot === slot) {
            cancel: setSelectedSlot(null);
          } else if (selectedSlot !== null) {
            drop: onWeaponDrop(attacks[selectedSlot].weapon.name, slot);
            setSelectedSlot(null);
          } else {
            pick: setSelectedSlot(slot);
          }
        };

        return (
          <Fragment key={slot}>
            <div
              className={classNames(`sheet__data sheet__attack-name-${slot}`, {
                'sheet__attack-name--hover':
                  (isOver && canDrop) || selectedSlot === slot,
              })}
              ref={el => {
                drop(el);
                drag(el);
              }}
            >
              <label className="sheet__attack-handler">
                <span
                  className="sheet__attack-handler-character"
                  onClick={onHandleClick}
                >
                  ░
                </span>
                <InventoryItem
                  ref={itemRefs.weapons.current[slot]}
                  pItem={attack.weapon}
                  isLast
                  onItemClick={onWeaponClick('weapons', slot)}
                  openModal={openItemModal('weapons', slot)}
                  closeModal={closeItemModal}
                  className={classNames('inventory-item__centered-item', {
                    'inventory-item__centered-item--selected':
                      weaponsLoading[slot],
                  })}
                  key={attack.weapon.name}
                />
              </label>

              {!!attack.specialAttackIndex && (
                <sup className="sheet__superscript">
                  {attack.specialAttackIndex}
                </sup>
              )}
            </div>
            {!!(attack.bonus || attack.bonus === 0) && (
              <span className={`sheet__data sheet__attack-bonus-${slot}`}>
                <SkillItem
                  ref={skillRefs.attackBonus.current[slot]}
                  traitName="attackBonus"
                  trait="Bonificador de ataque"
                  pc={pc}
                  openModal={openSkillModal('attackBonus', slot)}
                >
                  {increment(attack.bonus)}
                </SkillItem>
              </span>
            )}
            {!!attack.damage && (
              <span className={`sheet__data sheet__attack-type-${slot}`}>
                {attack.damage}
                <br />
                {attack.type}
              </span>
            )}
          </Fragment>
        );
      })}
      <ul className="sheet__data sheet__special-attacks">
        {getSpecialAttacks(pc, weaponsState).map((specialAttack, slot) => (
          <li className="sheet__special-attack" key={slot}>
            {specialAttack}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SheetAttacks;
