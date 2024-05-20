import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { getExtraWeapons, hasExtraWeapons } from '~/domain/characters';
import { getAnyItem, noItem } from '~/domain/equipment/equipment';
import { getAttacks, getSpecialAttacks, increment } from '~/domain/display';
import { InventoryItem } from '../modal/inventoryItem';
import { SkillItem } from '../modal/skillItem';
import { t } from '~/domain/translations';
import MagicItemsContext from '../contexts/magicItemsContext';
import classNames from 'classnames';
import NumericInput from '../inputs/numeric';

const noAttack = { weapon: noItem() };

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

  const allMagicItems = useContext(MagicItemsContext);

  const [weaponsLoading, setWeaponsLoading] = useState([false, false, false]);
  const [weaponsState, setWeaponsState] = useState(pc.items.weapons);
  useEffect(() => {
    setWeaponsState(pc.items.weapons);
    setWeaponsLoading([false, false, false]);
  }, [pc.items.weapons]);

  const weapons =
    useMemo(() => {
      return !!allMagicItems?.length && weaponsState;
    }, [allMagicItems, weaponsState]) || [];

  const [attacks, setAttacks] = useState([noAttack, noAttack, noAttack]);
  useEffect(() => {
    if (weapons.length) {
      setAttacks(getAttacks(pc, weapons));
    }
  }, [pc, weapons]);

  function onWeaponChange(i) {
    return newWeaponName => {
      submit(
        {
          action: 'equipWeapons',
          id: pc.id,
          oldWeaponName: weapons[i].name,
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
          weaponName: weapons[i].name,
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

  return (
    <>
      {attacks.map((attack, i) => {
        const [_1, drag] = useDrag(
          () => ({
            type: 'WEAPON',
            item: { value: attack.weapon.name },
            canDrag: () => !!attack.weapon.name && !weaponsLoading[i],
          }),
          [attack.weapon.name, weaponsLoading[i]]
        );

        const [{ isOver, canDrop }, drop] = useDrop(
          () => ({
            accept: 'WEAPON',
            drop: item => onWeaponDrop(item.value, i),
            canDrop: () => !weaponsLoading[i],
            collect: monitor => ({
              isOver: !!monitor.isOver(),
              canDrop: !!monitor.canDrop(),
            }),
          }),
          [attack.weapon.name, weaponsLoading[i]]
        );

        return (
          <Fragment key={i}>
            <div
              className={`sheet__data sheet__attack-name-${i} ${
                isOver && canDrop ? 'sheet__attack-name--hover' : ''
              }`}
              ref={el => {
                drop(el);
                drag(el);
              }}
            >
              <label className="sheet__attack-handler">
                <span className="sheet__attack-handler-character">░</span>
                <InventoryItem
                  ref={itemRefs.weapons.current[i]}
                  pItem={attack.weapon}
                  isLast
                  onItemClick={onWeaponClick('weapons', i)}
                  openModal={openItemModal('weapons', i)}
                  closeModal={closeItemModal}
                  className={classNames('inventory-item__centered-item', {
                    'inventory-item__centered-item--selected':
                      weaponsLoading[i],
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
              <span className={`sheet__data sheet__attack-bonus-${i}`}>
                <SkillItem
                  ref={skillRefs.attackBonus.current[i]}
                  traitName="attackBonus"
                  trait="Bonificador de ataque"
                  pc={pc}
                  openModal={openSkillModal('attackBonus', i)}
                >
                  {increment(attack.bonus)}
                </SkillItem>
              </span>
            )}
            {!!attack.damage && (
              <span className={`sheet__data sheet__attack-type-${i}`}>
                {attack.damage}
                <br />
                {attack.type}
              </span>
            )}
          </Fragment>
        );
      })}
      <ul className="sheet__data sheet__special-attacks">
        {getSpecialAttacks(pc, weapons).map((specialAttack, i) => (
          <li className="sheet__special-attack" key={i}>
            {specialAttack}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SheetAttacks;
