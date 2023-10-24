import { forwardRef } from 'react';

import styles from './inventoryItem.module.css';

export const CharacterItem = forwardRef(function CharacterItem(props, ref) {
  const { character, openModal, openOnRightClick } = props;

  return (
    <>
      <span
        ref={ref}
        className={styles.item}
        onClick={() => !openOnRightClick && openModal()}
        onContextMenu={e => {
          if (openOnRightClick) {
            e.preventDefault();
            openModal();
          }
        }}
      >
        {character.translation}
      </span>
    </>
  );
});
