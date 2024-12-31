import { useState } from 'react';

import {
  SkillModalContent,
  SpellModalContent,
  InvocationModalContent,
  ManeuverModalContent,
} from './skillModal';
import { BASE_CHARACTER } from '~/domain/characters';
import { markTraitSeen } from '~/services/pc.server';

const noOp = () => {};

export const actions = {
  seeTrait: async formData => {
    const id = formData.get('id');
    const trait = formData.get('trait');
    const updatedPc = await markTraitSeen(id, trait);
    return updatedPc;
  },
};

export function useSkillItems(
  pc = BASE_CHARACTER,
  skillRefs,
  submit = noOp,
  isDm
) {
  const [skillModalContent, setSkillModalContent] = useState(null);
  const [skillBigModalContent, setSkillBigModalContent] = useState(null);
  const [selectedSkillRef, setSelectedSkillRef] = useState(null);
  const closeSkillModal = () => {
    setSkillModalContent(null);
    setSkillBigModalContent(null);
  };

  function openSkillModal(
    sectionName,
    skillIndex = 0,
    actions,
    dontTriggerSeeTrait,
    selectedAction
  ) {
    return (skillName, skill, bigModal, position) => {
      if (!dontTriggerSeeTrait) {
        submit(
          {
            action: 'seeTrait',
            trait: skillName,
            id: pc.id,
          },
          { method: 'post' }
        );
      }

      setSelectedSkillRef(skillRefs[sectionName][skillIndex]);

      setTimeout(() => {
        const setModalContent = bigModal
          ? setSkillBigModalContent
          : setSkillModalContent;

        setModalContent(
          () => props =>
            skill === 'spell' ? (
              <SpellModalContent spellName={skillName} isDm={isDm} bigModal />
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
                skillIndex={skillIndex}
                position={position}
                isDm={isDm}
                actions={actions}
                openModal={openSkillModal}
                selectedAction={selectedAction}
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
