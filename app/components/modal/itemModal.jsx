import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { displayDamage } from '~/domain/display';
import { t } from '~/domain/translations';
import { getItemArmorClass, translateMoney } from '~/domain/characters';
import { translateDamage } from '~/domain/equipment/weapons';
import { getSelfLeftX, getSelfTopY } from './modalPosition';

export function ItemModalContent(props) {
  const { pc, item, actions = {}, isDm } = props;

  const subtypeTranslation = item.subtype && t(item.subtype);
  const isWeapon = item.type === 'weapon';
  const isArmor = item.type === 'armor';

  return (
    <>
      <h3 className="inventory-item__modal-title">
        {item.translation}{' '}
        {!!actions.addToTreasure && (
          <button
            type="button"
            className="inventory-item__add-item-button"
            onClick={actions.addToTreasure}
          >
            +
          </button>
        )}
      </h3>
      <div className="inventory-item__modal-content">
        <ul className="inventory-item__modal-options-left">
          {subtypeTranslation && (
            <li className="inventory-item__modal-item">
              <span className="inventory-item__modal-row-title">Tipo:</span>{' '}
              <strong className="inventory-item__modal-row-value">
                {subtypeTranslation}
              </strong>
            </li>
          )}
          {isWeapon && (
            <li className="inventory-item__modal-item">
              <span className="inventory-item__modal-row-title">Daño:</span>{' '}
              <strong className="inventory-item__modal-row-value">
                {displayDamage(pc, item)} ({translateDamage(item.damage[1])})
              </strong>
            </li>
          )}
          {isArmor && (
            <li className="inventory-item__modal-item">
              <span className="inventory-item__modal-row-title">AC:</span>{' '}
              <strong className="inventory-item__modal-row-value">
                {getItemArmorClass(pc, item.name)}
              </strong>
            </li>
          )}
          {!!isDm && (
            <li className="inventory-item__modal-item">
              <span className="inventory-item__modal-row-title">Coste:</span>{' '}
              <strong className="inventory-item__modal-row-value">
                {translateMoney(item.price)}
              </strong>
            </li>
          )}
          <li className="inventory-item__modal-item">
            <span className="inventory-item__modal-row-title">Peso:</span>{' '}
            <strong className="inventory-item__modal-row-value">
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
      {dropShadow && <div className="inventory-item__modal-shadow" />}
      <div
        className="inventory-item__action-modal"
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
