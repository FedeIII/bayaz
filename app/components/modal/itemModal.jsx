import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { displayDamage } from '~/domain/display';
import { t } from '~/domain/translations';
import { getItemArmorClass, translateMoney } from '~/domain/characters';
import { translateDamage } from '~/domain/equipment/weapons';
import { getSelfLeftX, getSelfTopY } from './modalPosition';

export function ItemModalContent(props) {
  const { item, pc, actions = {}, isDm } = props;
  const { weapons } = pc.items;

  if (!item) {
    return null;
  }

  const subtypeTranslation = item.subtype && t(item.subtype);
  const isWeapon = item.type === 'weapon';
  const isArmor = item.type === 'armor';

  return (
    <>
      <h3 className="inventory-item__modal-title">
        {item.translation || item.name}{' '}
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
                {displayDamage(pc, weapons, item)} (
                {translateDamage(item.damage[1])})
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
                {item.aproxPrice || translateMoney(item.price)}
              </strong>
            </li>
          )}
          <li className="inventory-item__modal-item">
            <span className="inventory-item__modal-row-title">Peso:</span>{' '}
            <strong className="inventory-item__modal-row-value">
              {item.weight ? item.weight + ' kg' : '-'}
            </strong>
          </li>
          {/* {item.charges !== null && (
            <li className="inventory-item__modal-item">
              <span className="inventory-item__modal-row-title">Cargas:</span>{' '}
              <strong className="inventory-item__modal-row-value">
                {item.charges}/{item.maxCharges}
              </strong>
            </li>
          )} */}
        </ul>

        {!!(isDm && item.description) && (
          <div
            className="inventory-item__modal-description"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
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
  const formPos = formRef?.current?.getBoundingClientRect();

  const [elPos, setElPos] = useState(null);
  useEffect(() => {
    if (elRef) {
      setElPos(elRef?.current?.getBoundingClientRect());
    }
  }, [setElPos, elRef?.current]);

  const [selfPosition, setSelfPosition] = useState(null);
  useEffect(() => {
    setSelfPosition(ref?.current?.getBoundingClientRect());
  }, [setSelfPosition, ref?.current]);

  const selfTopY = getSelfTopY({
    elPos,
    formPos,
    selfPosition,
    showOverMouse,
    center,
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
