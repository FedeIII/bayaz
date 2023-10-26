import { forwardRef } from 'react';
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
    children,
  } = props;

  return (
    <>
      <span
        ref={ref}
        className={styles.item}
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
