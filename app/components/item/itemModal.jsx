import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { displayDamage } from '~/domain/display';
import { translateItem } from '~/domain/equipment/equipment';
import { getItemArmorClass, translateMoney } from '~/domain/characters';

import styles from './inventoryItem.module.css';
import { translateDamage } from '~/domain/equipment/weapons';

export function ItemModalContent(props) {
  const { pc, item } = props;

  const subtypeTranslation = item.subtype && translateItem(item.subtype);
  const isWeapon = item.type === 'weapon';
  const isArmor = item.type === 'armor';

  return (
    <>
      <h3 className={styles.modalTitle}>{item.translation}</h3>
      <div className={styles.modalContent}>
        <ul className={styles.modalOptionsLeft}>
          {subtypeTranslation && (
            <li className={styles.modalItem}>
              <span className={styles.modalRowTitle}>Tipo:</span>{' '}
              <strong className={styles.modalRowValue}>
                {subtypeTranslation}
              </strong>
            </li>
          )}
          {isWeapon && (
            <li className={styles.modalItem}>
              <span className={styles.modalRowTitle}>Daño:</span>{' '}
              <strong className={styles.modalRowValue}>
                {displayDamage(pc, item)} ({translateDamage(item.damage[1])})
              </strong>
            </li>
          )}
          {isArmor && (
            <li className={styles.modalItem}>
              <span className={styles.modalRowTitle}>AC:</span>{' '}
              <strong className={styles.modalRowValue}>
                {getItemArmorClass(pc, item.name)}
              </strong>
            </li>
          )}
          <li className={styles.modalItem}>
            <span className={styles.modalRowTitle}>Coste:</span>{' '}
            <strong className={styles.modalRowValue}>
              {translateMoney(item.price)}
            </strong>
          </li>
          <li className={styles.modalItem}>
            <span className={styles.modalRowTitle}>Peso:</span>{' '}
            <strong className={styles.modalRowValue}>
              {item.weight ? item.weight + ' kg' : '-'}
            </strong>
          </li>
        </ul>
      </div>
    </>
  );
}

export function ItemModal(props) {
  const { children, elRef, formRef, closeModal, closeOnLeave } = props;

  const ref = useRef(null);
  const [selfPosition, setSelfPosition] = useState(null);
  const elPos = elRef?.current.getBoundingClientRect();
  const formPos = formRef?.current.getBoundingClientRect();

  useEffect(() => {
    setSelfPosition(ref?.current.getBoundingClientRect());
  }, [setSelfPosition, ref?.current]);

  return (
    <div
      className={styles.actionModal}
      style={{
        top:
          (elPos?.y || 0) -
          (formPos?.y || 0) -
          (selfPosition?.height || 0) +
          'px',
        left: (elPos?.x || 0) - (formPos?.x || 0) + 'px',
      }}
      onMouseLeave={closeOnLeave && closeModal}
      ref={ref}
    >
      <OutsideAlerter onClickOutside={closeModal} enabled>
        {!!selfPosition && children(props)}
      </OutsideAlerter>
    </div>
  );
}
