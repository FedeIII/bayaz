import { useState } from 'react';
import { getItem } from '~/domain/equipment/equipment';

import { ItemModalContent } from './itemModal';

export function useInventoryItems(pc, itemRefs, otherModalContent) {
  const [itemModalContent, setItemModalContent] = useState(null);
  const [selectedItemRef, setSelectedItemRef] = useState(null);
  const closeItemModal = () => setItemModalContent(null);

  function openItemModal(sectionName, itemIndex) {
    return itemName => {
      const item = getItem(itemName);

      if (!otherModalContent) {
        setSelectedItemRef(itemRefs[sectionName][itemIndex]);

        setTimeout(
          () =>
            setItemModalContent(() => props => (
              <ItemModalContent pc={pc} item={item} />
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
  ];
}
