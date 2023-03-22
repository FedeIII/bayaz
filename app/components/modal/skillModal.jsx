import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { displayTrait } from '~/domain/display';
import { getSkillExplanation, translateClass } from '~/domain/characters';

import styles from './inventoryItem.module.css';
import { translateSpell } from '~/domain/spells/spells';
import { getSpell } from '~/domain/spells/getSpells';
import {
  translateComponent,
  translateRange,
  translateSchool,
} from '~/domain/spells/spellTranslations';

const MODAL_VERTICAL_OFFSET = 100;
const MODAL_HORIZONTAL_OFFSET_RIGHT = 50;
const MODAL_HORIZONTAL_OFFSET_LEFT = -180;

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

export function SpellModalContent(props) {
  const { pc, spellName } = props;

  const spell = getSpell(spellName, pc.pClass);

  return (
    <>
      <h3 className={styles.modalTitle}>{translateSpell(spellName)}</h3>
      <div
        className={`${styles.modalContentText} ${styles.modalContentTextPadding}`}
      >
        <div>
          <strong>Nivel: </strong>
          {spell.level}
        </div>
        <div>
          <strong>Escuela: </strong>
          {translateSchool(spell.school)}
        </div>
        <div>
          <strong>Componentes: </strong>
          {spell.components
            .split(', ')
            .map(c => translateComponent(c))
            .join(', ')}
        </div>
        {spell.material && (
          <div>
            <strong>Material: </strong>
            {spell.material}
          </div>
        )}
        <div>
          <strong>Tiempo de lanzamiento: </strong>
          {spell.casting_time}
        </div>
        <div>
          <strong>Alcance: </strong>
          {translateRange(spell.range)}
        </div>
        <div>
          <strong>Duración: </strong>
          {spell.duration}
        </div>
        {spell.concentration && (
          <div>
            <strong>Requiere concentración</strong>
          </div>
        )}
        {spell.ritual && (
          <div>
            <strong>(Ritual)</strong>
          </div>
        )}
        <div>
          <strong>Clases: </strong>
          {spell.class.map(c => translateClass(c)).join(', ')}
        </div>
        {spell.domains && (
          <div>
            <strong>Dominio Divino: </strong>
            {spell.domains}
          </div>
        )}
        {spell.oath && (
          <div>
            <strong>Juramento Sagrado: </strong>
            {spell.oaths}
          </div>
        )}
        {spell.patrons && (
          <div>
            <strong>Patrón: </strong>
            {spell.patrons}
          </div>
        )}
        {spell.archetype && (
          <div>
            <strong>Arquetipo: </strong>
            {spell.archetype}
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: spell.desc }} />
        {spell.higher_level && (
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<strong>En niveles superiores: </strong>' + spell.higher_level,
            }}
          />
        )}
      </div>
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

  if (
    selfLeftX + formLeftX + selfWidth >
    formWidth - MODAL_HORIZONTAL_OFFSET_RIGHT
  )
    selfLeftX =
      formWidth - MODAL_HORIZONTAL_OFFSET_RIGHT - selfWidth - formLeftX;

  if (selfLeftX < formLeftX + MODAL_HORIZONTAL_OFFSET_LEFT)
    selfLeftX = formLeftX + MODAL_HORIZONTAL_OFFSET_LEFT;

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
