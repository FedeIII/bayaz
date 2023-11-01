import { InventoryItem } from '../modal/inventoryItem';
import { getItem } from '~/domain/equipment/equipment';
import { displayMoneyAmount } from '~/domain/display';
import { t } from '~/domain/translations';

import styles from '~/components/sheet.module.css';
import itemStyles from '~/components/modal/inventoryItem.module.css';

function ArmorModalContent(props) {
  const { pc, armor, onArmorChange, closeModal } = props;
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

  return (
    <>
      <h3 className={itemStyles.actionModalTitle}>{armor.translation}</h3>
      <span className={itemStyles.modalClose} onClick={closeModal}>
        ⨉
      </span>
      <div className={itemStyles.modalContent}>
        <ul className={itemStyles.modalOptions}>
          <li>
            Cambiar por:{' '}
            <select className={styles.selectAttack} onChange={onEquipClick}>
              <option value={armor.name}>{armor.translation}</option>
              {armors.map(extraArmor => (
                <option value={extraArmor.name} key={extraArmor.name}>
                  {t(extraArmor.name)}
                </option>
              ))}
            </select>
          </li>
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
              onArmorChange={onArmorChange}
              closeModal={() => setActionModalContent(null)}
            />
          )),
        0
      );
    };
  }

  return (
    <>
      <ul className={`${styles.data} ${styles.equipment}`}>
        {!!equipment.armor && (
          <li>
            <u>Armadura:</u>{' '}
            <InventoryItem
              ref={itemRefs.armor[0]}
              pItem={equipment.armor}
              isLast
              onItemClick={!!treasure.armors.length && onArmorClick('armor')}
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
                ref={itemRefs.others[i]}
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

      <div className={`${styles.data} ${styles.copper}`}>
        {displayMoneyAmount(money[2])}
      </div>
      <div className={`${styles.data} ${styles.silver}`}>
        {displayMoneyAmount(money[1])}
      </div>
      <div className={`${styles.data} ${styles.gold}`}>
        {displayMoneyAmount(money[0])}
      </div>
    </>
  );
}

export default SheetEquipment;
