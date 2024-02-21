import { forwardRef } from 'react';

export const CharacterItem = forwardRef(function CharacterItem(props, ref) {
  const { character, nick, openModal, openOnRightClick } = props;

  return (
    <>
      <span
        ref={ref}
        className="inventory-item"
        onClick={() => !openOnRightClick && openModal()}
        onContextMenu={e => {
          if (openOnRightClick) {
            e.preventDefault();
            openModal();
          }
        }}
      >
        {nick || character.translation || character.name}
      </span>
    </>
  );
});
