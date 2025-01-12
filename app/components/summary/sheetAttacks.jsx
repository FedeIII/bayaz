import { Fragment, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';

import { getExtraWeapons, hasExtraWeapons } from '~/domain/characters';
import { getItem, noItem } from '~/domain/equipment/equipment';
import { getAttacks, getSpecialAttacks, increment } from '~/domain/display';
import { InventoryItem } from '../modal/inventoryItem';
import { SkillItem } from '../modal/skillItem';
import {
  equipWeaponInSlot,
  identifyItem,
  reorderWeapons,
  unequipWeapon,
} from '~/services/pc.server';
import { renderItemName } from '~/domain/equipment/items';

const noAttack = { weapon: noItem() };

const ATTACK_BONUS_MAX_FONT_SIZE = 1.2;
function getAttackBonusFontSize(attackBonusText) {
  return (
    Math.min(
      -0.05 * attackBonusText.length + 1.55,
      ATTACK_BONUS_MAX_FONT_SIZE
    ) + 'cqw'
  );
}

export const actions = {
  identifyItem: async formData => {
    const id = formData.get('id');
    const sectionPath = formData.get('sectionPath');
    const itemName = formData.get('itemName');

    return await identifyItem(id, sectionPath, itemName);
  },

  equipWeapons: async formData => {
    const slot = formData.get('slot');
    const newWeaponName = formData.get('newWeaponName');
    const id = formData.get('id');

    return await equipWeaponInSlot(id, newWeaponName, slot);
  },

  unequipWeapon: async formData => {
    const id = formData.get('id');
    const slot = formData.get('slot');

    return await unequipWeapon(id, parseInt(slot, 10));
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
    isDm,
    weapon,
    identifyItem,
    onWeaponChange,
    onWeaponUnequip,
    closeModal,
  } = props;

  function onEquipClick(e) {
    const newWeaponName = e.target.value;
    onWeaponChange(newWeaponName);
    closeModal();
  }

  function onIdentifyClick(e) {
    const weaponName = e.target.value;
    identifyItem(pc.id, 'weapons', weaponName);
    closeModal();
  }

  function onUnequipClick() {
    onWeaponUnequip();
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
            Cambiar por:{' '}
            <select
              className="sheet__select-attack"
              disabled={!hasExtraWeapons(pc)}
              onChange={onEquipClick}
            >
              <option value={weapon.name}>{weaponDisplay}</option>
              {getExtraWeapons(pc).map(extraWeapon => (
                <option value={extraWeapon.name} key={extraWeapon.name}>
                  {renderItemName(getItem(extraWeapon))}
                </option>
              ))}
            </select>
          </li>

          {!!(isDm && weapon.description && !weapon.identified) && (
            <li>
              <button
                type="button"
                value={weapon.name}
                className="sheet__select-attack"
                onClick={onIdentifyClick}
              >
                Identificar {weaponDisplay}
              </button>
            </li>
          )}

          <li>
            <button
              type="button"
              className="sheet__select-attack"
              onClick={onUnequipClick}
            >
              Desequipar
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function SheetAttacks(props) {
  const {
    pc,
    isDm,
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

  function identifyItem(pcId, sectionPath, itemName) {
    submit(
      {
        action: 'identifyItem',
        id: pcId,
        sectionPath,
        itemName,
      },
      { method: 'post' }
    );
  }

  function onWeaponChange(i) {
    return newWeaponName => {
      submit(
        {
          action: 'equipWeapons',
          id: pc.id,
          slot: i,
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
          slot: i,
        },
        { method: 'post' }
      );
    };
  }

  function onWeaponDrop(weaponName, weaponSlot) {
    const selectedWeapon = getItem(weaponName);
    setWeaponsState(w => {
      const newW = w.slice();

      const originSlot = newW.findIndex(weapon => weapon?.name === weaponName);
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
      const item = getItem(itemName);

      setSelectedItemRef(itemRefs[itemType][itemIndex]);
      setTimeout(
        () =>
          setActionModalContent(() => props => (
            <WeaponModalContent
              pc={pc}
              isDm={isDm}
              weapon={item}
              identifyItem={identifyItem}
              onWeaponChange={onWeaponChange(itemIndex)}
              onWeaponUnequip={onWeaponUnequip(itemIndex)}
              closeModal={() => setActionModalContent(null)}
            />
          )),
        0
      );
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

        const attackBonusText = !!(attack.bonus || attack.bonus === 0)
          ? `${increment(attack.bonus)}${
              !!attack.extraBonus.length
                ? ` (${attack.extraBonus
                    .map(([_, bonus]) => increment(attack.bonus + bonus))
                    .join(', ')})`
                : ''
            }`
          : '';

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
                  ref={itemRefs.weapons[slot]}
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
            {!!attackBonusText && (
              <span
                className={`sheet__data sheet__attack-bonus-${slot}`}
                style={{
                  fontSize: getAttackBonusFontSize(attackBonusText),
                }}
              >
                <SkillItem
                  ref={skillRefs.attackBonus.current[slot]}
                  traitName="attackBonus"
                  trait="Bonificador de ataque"
                  pc={pc}
                  openModal={openSkillModal(
                    'attackBonus',
                    slot,
                    {},
                    'dontTriggerSeeTrait'
                  )}
                >
                  {attackBonusText}
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
