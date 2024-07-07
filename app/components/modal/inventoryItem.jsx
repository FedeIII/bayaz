import { forwardRef } from 'react';
import { itemWithAmount } from '~/domain/display';
import { getItem } from '~/domain/equipment/equipment';

const noOp = () => {};

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
    dontCloseOnMouseOut,
  } = props;
  const item = getItem(pItem);

  if (!item?.name) return null;

  const internalDontCloseOnMouseOut = dontCloseOnMouseOut || !!item.description;

  const openModalForItem = () => openModal(pItem.name, actions);
  const onClickForItem = () => onItemClick?.(pItem);

  return (
    <>
      <strong
        ref={ref}
        className={`inventory-item ${className}`}
        onClick={openModalOnClick ? openModalForItem : onClickForItem}
        onMouseOver={openModalOnClick ? noOp : openModalForItem}
        onMouseOut={
          openModalOnClick || internalDontCloseOnMouseOut ? noOp : closeModal
        }
      >
        {itemWithAmount(item.translation || item.name, pItem.amount)}
      </strong>
      {!isLast && ', '}
    </>
  );
});
