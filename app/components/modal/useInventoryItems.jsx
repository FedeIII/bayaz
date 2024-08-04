import { useState } from 'react';
import { getItem } from '~/domain/equipment/equipment';

import { ItemModalContent } from './itemModal';
import { BASE_CHARACTER } from '~/domain/characters';

const noOp = () => {};

export function useInventoryItems(
  pc = BASE_CHARACTER,
  itemRefs,
  otherModalContent
) {
  const [itemModalContent, setItemModalContent] = useState(null);
  const [selectedItemRef, setSelectedItemRef] = useState(null);
  const closeItemModal = () => {
    onCloseModalCallback?.();
    setItemModalContent(null);
  };
  const [onCloseModalCallback, setOnCloseModalCallback] = useState(noOp);

  function openItemModal(sectionName, itemIndex = 0) {
    return (pItem, actions) => {
      const item = getItem(pItem);

      if (!otherModalContent) {
        setSelectedItemRef(itemRefs[sectionName][itemIndex]);
        setTimeout(
          () =>
            setItemModalContent(() => props => (
              <ItemModalContent
                pc={pc}
                item={item}
                actions={actions}
                {...props}
              />
            )),
          0
        );
      }
    };
  }

  return [
    itemModalContent,
    closeItemModal,
    openItemModal,
    selectedItemRef,
    setSelectedItemRef,
    cb => setOnCloseModalCallback(() => cb),
  ];
}
