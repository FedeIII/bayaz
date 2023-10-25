import { useState } from 'react';

import { MonsterContent } from './characterModal';

export function useCharacterItems(characterRefs) {
  const [characterModalContent, setCharacterModalContent] = useState(null);
  const [selectedCharacterRef, setSelectedCharacterRef] = useState(null);
  const closeCharacterModal = () => {
    setCharacterModalContent(null);
  };

  function openCharacterModal(character, charSection, charIndex = 0) {
    return () => {
      setSelectedCharacterRef(characterRefs[charSection][charIndex]);

      setTimeout(() => {
        setCharacterModalContent(() => props => {
          return <MonsterContent character={character} {...props} />;
        });
      }, 0);
    };
  }

  return [
    characterModalContent,
    closeCharacterModal,
    openCharacterModal,
    selectedCharacterRef,
    setSelectedCharacterRef,
  ];
}
