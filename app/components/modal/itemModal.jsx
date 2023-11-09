import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { displayDamage } from '~/domain/display';
import { t } from '~/domain/translations';
import { getItemArmorClass, translateMoney } from '~/domain/characters';
import { translateDamage } from '~/domain/equipment/weapons';
import { getSelfLeftX, getSelfTopY } from './modalPosition';

import styles from './inventoryItem.module.css';

export function ItemModalContent(props) {
  const { pc, item, actions = {}, isForPlayers } = props;

  const subtypeTranslation = item.subtype && t(item.subtype);
  const isWeapon = item.type === 'weapon';
  const isArmor = item.type === 'armor';

  return (
    <>
      <h3 className={styles.modalTitle}>
        {item.translation}{' '}
        {!!actions.addToTreasure && (
          <button
            type="button"
            className={styles.addItemButton}
            onClick={actions.addToTreasure}
          >
            +
          </button>
        )}
      </h3>
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
          {!isForPlayers && (
            <li className={styles.modalItem}>
              <span className={styles.modalRowTitle}>Coste:</span>{' '}
              <strong className={styles.modalRowValue}>
                {translateMoney(item.price)}
              </strong>
            </li>
          )}
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
  const {
    children,
    elRef,
    formRef,
    closeModal,
    closeOnLeave,
    center,
    dropShadow,
    showOverMouse = 0,
  } = props;

  const ref = useRef(null);
  const [selfPosition, setSelfPosition] = useState(null);
  const elPos = elRef?.current?.getBoundingClientRect();
  const formPos = formRef?.current?.getBoundingClientRect();

  useEffect(() => {
    setSelfPosition(ref?.current?.getBoundingClientRect());
  }, [setSelfPosition, ref?.current]);

  const selfTopY = getSelfTopY({
    elPos,
    formPos,
    selfPosition,
    showOverMouse,
  });
  const selfLeftX = getSelfLeftX({
    elPos,
    formPos,
    selfPosition,
    center,
  });

  return (
    <>
      {dropShadow && <div className={styles.modalShadow} />}
      <div
        className={styles.actionModal}
        style={{
          top: selfTopY + 'px',
          left: selfLeftX + 'px',
        }}
        onMouseLeave={closeOnLeave && closeModal}
        ref={ref}
      >
        <OutsideAlerter onClickOutside={closeModal} enabled>
          {!!selfPosition && children(props)}
        </OutsideAlerter>
      </div>
    </>
  );
}
