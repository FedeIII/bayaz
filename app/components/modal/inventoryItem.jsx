import { forwardRef } from 'react';
import { itemWithAmount } from '~/domain/display';
import { getItem } from '~/domain/equipment/equipment';

import styles from './inventoryItem.module.css';

export const InventoryItem = forwardRef(function InventoryItem(props, ref) {
  const {
    pItem,
    isLast,
    onItemClick,
    openModal,
    closeModal,
    className = '',
  } = props;
  const item = getItem(pItem.name);

  if (!item?.name) return null;

  return (
    <>
      <strong
        ref={ref}
        className={`${styles.item} ${className}`}
        onClick={() => onItemClick?.(pItem.name)}
        onMouseOver={() => openModal(pItem.name)}
        onMouseOut={closeModal}
      >
        {itemWithAmount(item.translation, pItem.amount)}
      </strong>
      {!isLast && ', '}
    </>
  );
});
