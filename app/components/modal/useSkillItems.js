import { useState } from 'react';

import { SkillModalContent, SpellModalContent } from './skillModal';

export function useSkillItems(pc, skillRefs) {
  const [skillModalContent, setSkillModalContent] = useState(null);
  const [selectedSkillRef, setSelectedSkillRef] = useState(null);
  const closeSkillModal = () => setSkillModalContent(null);

  function openSkillModal(sectionName, skillIndex = 0) {
    return (skillName, skill) => {
      setSelectedSkillRef(skillRefs[sectionName][skillIndex]);

      setTimeout(
        () =>
          setSkillModalContent(
            () => props =>
              skill === 'spell' ? (
                <SpellModalContent pc={pc} spellName={skillName} />
              ) : (
                <SkillModalContent
                  pc={pc}
                  skillName={skillName}
                  skill={skill}
                />
              )
          ),
        0
      );
    };
  }

  return [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ];
}
