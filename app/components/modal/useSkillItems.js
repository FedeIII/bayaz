import { useState } from 'react';

import {
  SkillModalContent,
  SpellModalContent,
  InvocationModalContent,
  ManeuverModalContent,
} from './skillModal';

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
              ) : skill === 'invocation' ? (
                <InvocationModalContent
                  pc={pc}
                  skillName={skillName}
                  skill={skill}
                />
              ) : skill === 'maneuver' ? (
                <ManeuverModalContent
                  pc={pc}
                  skillName={skillName}
                  skill={skill}
                />
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
