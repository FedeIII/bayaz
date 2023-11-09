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
    actions = {},
    className = '',
    openModalOnClick,
  } = props;
  const item = getItem(pItem.name);

  if (!item?.name) return null;

  const openModalForItem = () => openModal(pItem.name, actions);
  const onClickForItem = () => onItemClick?.(pItem.name);

  return (
    <>
      <strong
        ref={ref}
        className={`${styles.item} ${className}`}
        onClick={openModalOnClick ? openModalForItem : onClickForItem}
        onMouseOver={!openModalOnClick && openModalForItem}
        onMouseOut={!openModalOnClick && closeModal}
      >
        {itemWithAmount(item.translation, pItem.amount)}
      </strong>
      {!isLast && ', '}
    </>
  );
});
