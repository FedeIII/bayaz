import { forwardRef } from 'react';
import { displayTrait } from '~/domain/display';
import { translateSpell } from '~/domain/spells/spells';
import { displayInvocation } from '~/domain/classes/warlock/displayWarlockTrait';
import { translateCombatSuperiorityManeuvers } from '~/domain/classes/fighter/fighter';
import { translateElementalDisciplines } from '~/domain/classes/monk/monk';

import styles from './inventoryItem.module.css';

export const SkillItem = forwardRef(function SkillItem(props, ref) {
  const { traitName, trait, pc, openModal, openOnRightClick, bigModal } = props;

  return (
    <>
      <span
        ref={ref}
        className={styles.item}
        onClick={() =>
          !openOnRightClick && openModal(traitName, trait, bigModal)
        }
        onContextMenu={e => {
          if (openOnRightClick) {
            e.preventDefault();
            openModal(traitName, trait, bigModal);
          }
        }}
      >
        {trait === 'spell'
          ? translateSpell(traitName)
          : trait === 'invocation'
          ? displayInvocation(traitName, trait, pc)
          : trait === 'maneuver'
          ? translateCombatSuperiorityManeuvers(traitName)
          : trait === 'discipline'
          ? translateElementalDisciplines(traitName)
          : displayTrait(traitName, trait, pc)}
      </span>
    </>
  );
});
