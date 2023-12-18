import { useState } from 'react';
import { getAnyItem } from '~/domain/equipment/equipment';

import { ItemModalContent } from './itemModal';
import { BASE_CHARACTER } from '~/domain/characters';

export function useInventoryItems(
  pc = BASE_CHARACTER,
  itemRefs,
  otherModalContent
) {
  const [itemModalContent, setItemModalContent] = useState(null);
  const [selectedItemRef, setSelectedItemRef] = useState(null);
  const closeItemModal = () => setItemModalContent(null);

  function openItemModal(sectionName, itemIndex = 0) {
    return (itemName, actions) => {
      getAnyItem(itemName).then(item => {
        if (!otherModalContent) {
          setSelectedItemRef(itemRefs[sectionName].current[itemIndex]);
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
      });
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
