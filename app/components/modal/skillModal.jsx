import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { displayTrait } from '~/domain/display';
import { getSkillExplanation } from '~/domain/characters';

import styles from './inventoryItem.module.css';

const MODAL_VERTICAL_OFFSET = 100;
const MODAL_HORIZONTAL_OFFSET = 50;

export function SkillModalContent(props) {
  const { pc, skillName, skill } = props;

  const skillExplanation = getSkillExplanation(skillName, skill, pc);
  const skillTitle = displayTrait(skillName, skill, pc);

  return (
    <>
      <h3 className={styles.modalTitle}>{skillTitle}</h3>
      <div className={styles.modalContentText}>{skillExplanation}</div>
    </>
  );
}

function getSelfTopY(elPos, formPos, selfPosition) {
  let selfTopY = (elPos?.y || 0) - (formPos?.y || 0);
  const selfHeight = selfPosition?.height || 0;
  const selfBottomY = selfTopY + selfHeight;
  const formTopY = -formPos?.y || 0;
  const windowHeight = window?.innerHeight || 0;
  const formBottomY = formTopY + windowHeight;

  if (selfTopY < formTopY + MODAL_VERTICAL_OFFSET)
    selfTopY = formTopY + MODAL_VERTICAL_OFFSET;
  if (selfBottomY > formBottomY - MODAL_VERTICAL_OFFSET)
    selfTopY = formBottomY - MODAL_VERTICAL_OFFSET - selfHeight;

  return selfTopY;
}

function getSelfLeftX(elPos, formPos, selfPosition) {
  const selfWidth = selfPosition?.width || 0;
  const formWidth = formPos?.width || 0;
  const formLeftX = formPos?.x || 0;

  let selfLeftX = (elPos?.x || 0) - formLeftX - selfWidth / 2;

  if (selfLeftX + formLeftX + selfWidth > formWidth - MODAL_HORIZONTAL_OFFSET)
    selfLeftX = formWidth - MODAL_HORIZONTAL_OFFSET - selfWidth - formLeftX;

  return selfLeftX;
}

export function SkillModal(props) {
  const { children, elRef, formRef, closeModal, closeOnLeave } = props;

  const ref = useRef(null);
  const [selfPosition, setSelfPosition] = useState(null);
  const elPos = elRef?.current.getBoundingClientRect();
  const formPos = formRef?.current.getBoundingClientRect();

  useEffect(() => {
    setSelfPosition(ref?.current.getBoundingClientRect());
  }, [setSelfPosition, ref?.current]);

  const selfTopY = getSelfTopY(elPos, formPos, selfPosition);
  const selfLeftX = getSelfLeftX(elPos, formPos, selfPosition);

  return (
    <>
      <div className={styles.modalShadow} />
      <div
        className={styles.actionModal}
        style={{
          top: selfTopY + 'px',
          left: selfLeftX + 'px',
        }}
        onMouseLeave={closeOnLeave && closeModal}
        ref={ref}
      >
        <OutsideAlerter onClickOutside={closeModal} enabled>
          {!!selfPosition && children(props)}
        </OutsideAlerter>
      </div>
    </>
  );
}
