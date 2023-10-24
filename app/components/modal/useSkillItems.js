import { useState } from 'react';

import {
  SkillModalContent,
  SpellModalContent,
  InvocationModalContent,
  ManeuverModalContent,
} from './skillModal';
import { BASE_CHARACTER } from '~/domain/characters';

const noOp = () => {};

export function useSkillItems(pc = BASE_CHARACTER, skillRefs, submit = noOp) {
  const [skillModalContent, setSkillModalContent] = useState(null);
  const [skillBigModalContent, setSkillBigModalContent] = useState(null);
  const [selectedSkillRef, setSelectedSkillRef] = useState(null);
  const closeSkillModal = () => {
    setSkillModalContent(null);
    setSkillBigModalContent(null);
  };

  function openSkillModal(sectionName, skillIndex = 0) {
    return (skillName, skill, bigModal) => {
      setSelectedSkillRef(skillRefs[sectionName][skillIndex]);

      setTimeout(() => {
        const setModalContent = bigModal
          ? setSkillBigModalContent
          : setSkillModalContent;
        setModalContent(
          () => props =>
            skill === 'spell' ? (
              <SpellModalContent spellName={skillName} bigModal />
            ) : skill === 'invocation' ? (
              <InvocationModalContent
                pc={pc}
                skillName={skillName}
                skill={skill}
                bigModal
              />
            ) : skill === 'maneuver' ? (
              <ManeuverModalContent
                pc={pc}
                skillName={skillName}
                skill={skill}
                bigModal
              />
            ) : (
              <SkillModalContent
                pc={pc}
                skillName={skillName}
                skill={skill}
                bigModal
                submit={submit}
                {...props}
              />
            )
        );
      }, 0);
    };
  }

  return [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
    skillBigModalContent,
  ];
}
