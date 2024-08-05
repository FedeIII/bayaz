import { forwardRef } from 'react';
import { getItem } from '~/domain/equipment/equipment';
import { renderItemNameWithAmount } from '~/domain/equipment/items';

const noOp = () => {};

export const InventoryItem = forwardRef(function InventoryItem(props, ref) {
  const {
    pItem,
    isDm,
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

  const openModalForItem = () => openModal(pItem, actions);
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
        {renderItemNameWithAmount(item, isDm)}
      </strong>
      {!isLast && ', '}
    </>
  );
});
