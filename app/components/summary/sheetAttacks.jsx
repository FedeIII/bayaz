import { Fragment, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { getExtraWeapons, hasExtraWeapons } from '~/domain/characters';
import { getItem, noItem } from '~/domain/equipment/equipment';
import { getAttacks, getSpecialAttacks, increment } from '~/domain/display';
import { InventoryItem } from '../modal/inventoryItem';
import { SkillItem } from '../modal/skillItem';
import { t } from '~/domain/translations';

const noAttack = { weapon: noItem() };

function WeaponModalContent(props) {
  const { pc, weapon, onWeaponChange, onWeaponUnequip, closeModal } = props;

  function onEquipClick(e) {
    const newWeaponName = e.target.value;
    onWeaponChange(newWeaponName);
    closeModal();
  }

  function onUnequipClick() {
    onWeaponUnequip();
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
        </ul>
      </div>
    </>
  );
}

function SheetAttacks(props) {
  const {
    pc,
    pcName,
    itemRefs,
    setSelectedItemRef,
    setActionModalContent,
    openItemModal,
    closeItemModal,
    skillRefs,
    openSkillModal,
    submit,
  } = props;
  const {
    items: { weapons },
  } = pc;

  const [attacks, setAttacks] = useState([noAttack, noAttack, noAttack]);
  useEffect(() => {
    setAttacks(getAttacks(pc));
  }, [pc]);

  function onWeaponChange(i) {
    return newWeaponName => {
      submit(
        {
          action: 'equipWeapons',
          name: pcName,
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
          name: pcName,
          weaponName: weapons[i].name,
        },
        { method: 'post' }
      );
    };
  }

  function onWeaponClick(itemType, itemIndex = 0) {
    return itemName => {
      const item = getItem(itemName);

      setSelectedItemRef(itemRefs[itemType].current[itemIndex]);

      setTimeout(
        () =>
          setActionModalContent(() => props => (
            <WeaponModalContent
              pc={pc}
              weapon={item}
              onWeaponChange={onWeaponChange(itemIndex)}
              onWeaponUnequip={onWeaponUnequip(itemIndex)}
              closeModal={() => setActionModalContent(null)}
            />
          )),
        0
      );
    };
  }

  function onWeaponDrop(weaponName, weaponSlot) {
    submit(
      {
        action: 'reorderWeapons',
        name: pcName,
        weaponName,
        weaponSlot,
      },
      { method: 'post' }
    );
  }

  return (
    <>
      {attacks.map((attack, i) => {
        const [_1, drag] = useDrag(
          () => ({
            type: 'WEAPON',
            item: { value: attack.weapon.name },
            canDrag: () => !!attack.weapon.name,
          }),
          [attack.weapon.name]
        );

        const [{ isOver, canDrop }, drop] = useDrop(
          () => ({
            accept: 'WEAPON',
            drop: item => onWeaponDrop(item.value, i),
            canDrop: () => true,
            collect: monitor => ({
              isOver: !!monitor.isOver(),
              canDrop: !!monitor.canDrop(),
            }),
          }),
          [attack.weapon.name]
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
                  className="inventory-item__centered-item"
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
        {getSpecialAttacks(pc).map((specialAttack, i) => (
          <li className="sheet__special-attack" key={i}>
            {specialAttack}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SheetAttacks;
