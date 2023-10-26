import { forwardRef, useEffect, useMemo } from 'react';
import { displayTrait } from '~/domain/display';
import { translateSpell } from '~/domain/spells/spells';
import { displayInvocation } from '~/domain/classes/warlock/displayWarlockTrait';
import { translateCombatSuperiorityManeuvers } from '~/domain/classes/fighter/fighter';
import { translateElementalDisciplines } from '~/domain/classes/monk/monk';
import { BASE_CHARACTER } from '~/domain/characters';

import styles from './inventoryItem.module.css';

export const SkillItem = forwardRef(function SkillItem(props, ref) {
  const {
    traitName,
    trait,
    pc = BASE_CHARACTER,
    openModal,
    openOnRightClick,
    bigModal,
    disabled,
    position,
    children,
  } = props;

  useEffect(() => {
    if (position?.[0]) {
      openModal(traitName, trait, bigModal, position);
    }
  }, [position?.[0], position?.[1], traitName, trait, bigModal]);

  const style = useMemo(() => {
    return position
      ? {
          left: position[0],
          top: position[1],
          display: position[0] ? 'block' : 'none',
          position: 'absolute',
        }
      : null;
  }, [position?.[0], position?.[1]]);

  return (
    <>
      <span
        ref={ref}
        className={styles.item}
        style={style}
        onClick={() =>
          !disabled &&
          !openOnRightClick &&
          openModal(traitName, trait, bigModal)
        }
        onContextMenu={e => {
          if (!disabled && openOnRightClick) {
            e.preventDefault();
            openModal(traitName, trait, bigModal);
          }
        }}
      >
        {!!children && children}
        {!children &&
          !position &&
          (trait === 'spell'
            ? translateSpell(traitName)
            : trait === 'invocation'
            ? displayInvocation(traitName, trait, pc)
            : trait === 'maneuver'
            ? translateCombatSuperiorityManeuvers(traitName)
            : trait === 'discipline'
            ? translateElementalDisciplines(traitName)
            : displayTrait(traitName, trait, pc))}
      </span>
    </>
  );
});
