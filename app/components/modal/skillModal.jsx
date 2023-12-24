import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { displayTrait } from '~/domain/display';
import { getSkillExplanation, translateClass } from '~/domain/characters';
import { translateSpell } from '~/domain/spells/spells';
import { getSpell } from '~/domain/spells/getSpells';
import {
  translateComponent,
  translateRange,
  translateSchool,
} from '~/domain/spells/spellTranslations';
import { getInvocationExplanation } from '~/domain/classes/warlock/warlockSkillsExplanation';
import { getInvocation } from '~/domain/classes/warlock/warlock';
import { translateCombatSuperiorityManeuvers } from '~/domain/classes/fighter/fighter';
import { displayManeuver } from '~/domain/classes/fighter/fighterSkillsExplanation';
import { getSelfLeftX, getSelfTopY } from './modalPosition';

export function SkillModalContent(props) {
  const {
    pc,
    skillName,
    skill,
    bigModal,
    submit,
    closeModal,
    skillIndex,
    position,
    isDm,
    actions,
  } = props;

  const skillExplanation = getSkillExplanation({
    skillName,
    skill,
    pc,
    submit,
    closeModal,
    skillIndex,
    position,
    isDm,
    actions,
  });

  const skillTitle =
    skillName === 'resetSpellSlots'
      ? `Espacios de nivel ${skill}`
      : displayTrait(skillName, skill, pc);

  return (
    <>
      <h3 className="inventory-item__modal-title">{skillTitle}</h3>
      <div
        className={
          bigModal
            ? 'inventory-item__modal-big-content-text'
            : 'inventory-item__modal-content-text'
        }
      >
        {skillExplanation}
      </div>
    </>
  );
}

export function SpellModalContent(props) {
  const { spellName } = props;

  const spell = getSpell(spellName);

  return (
    <>
      <h3 className="inventory-item__modal-title">
        {translateSpell(spellName)}
      </h3>
      <div className="inventory-item__modal-content-text inventory-item__modal-content-text-padding">
        <div>
          <strong>Nivel: </strong>
          {spell.level === 0 ? 'Truco' : spell.level}
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
        {!!spell.archetype?.warlock && (
          <div>
            <strong>Patrón: </strong>
            {spell.archetype.warlock}
          </div>
        )}
        {spell.archetype && (
          <div>
            <strong>Arquetipo: </strong>
            {Object.entries(spell.archetype).join(' | ')}
          </div>
        )}
        {spell.desc}
        {spell.higher_level && (
          <div>
            <strong>
              <u>En niveles superiores:</u>
            </strong>
            {spell.higher_level}
          </div>
        )}
      </div>
    </>
  );
}

export function InvocationModalContent(props) {
  const { pc, skillName, skill } = props;

  const invocationTitle = getInvocation(skillName).translation;
  const invocationExplanation = getInvocationExplanation(skillName, skill, pc);

  return (
    <>
      <h3 className="inventory-item__modal-title">{invocationTitle}</h3>
      <div className="inventory-item__modal-content-text">
        {invocationExplanation}
      </div>
    </>
  );
}

export function ManeuverModalContent(props) {
  const { pc, skillName, skill } = props;

  const maneuverTitle = translateCombatSuperiorityManeuvers(skillName);
  const maneuverExplanation = displayManeuver(skillName, skill, pc);

  return (
    <>
      <h3 className="inventory-item__modal-title">{maneuverTitle}</h3>
      <div className="inventory-item__modal-content-text">
        {maneuverExplanation}
      </div>
    </>
  );
}

export function SkillModal(props) {
  const { children, elRef, formRef, closeModal, closeOnLeave, bigModal } =
    props;

  const ref = useRef(null);
  const [selfPosition, setSelfPosition] = useState(null);
  const elPos = elRef?.current.getBoundingClientRect();
  const formPos = formRef?.current.getBoundingClientRect();

  useEffect(() => {
    setSelfPosition(ref?.current.getBoundingClientRect());
  }, [setSelfPosition, ref?.current]);

  const selfTopY = getSelfTopY({
    elPos,
    formPos,
    selfPosition,
    bigModal,
    showOverMouse: 1,
  });
  const selfLeftX = getSelfLeftX({ elPos, formPos, selfPosition });

  return (
    <>
      <div className="inventory-item__modal-shadow" />
      <div
        className={
          bigModal
            ? 'inventory-item__action-modal-big'
            : 'inventory-item__action-modal'
        }
        style={
          bigModal
            ? { top: selfTopY + 'px' }
            : {
                top: selfTopY + 'px',
                left: selfLeftX + 'px',
              }
        }
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
