import { forwardRef } from 'react';
import { displayTrait } from '~/domain/display';
import { translateSpell } from '~/domain/spells/spells';
import { displayInvocation } from '~/domain/classes/warlock/displayWarlockTrait';

import styles from './inventoryItem.module.css';

export const SkillItem = forwardRef(function SkillItem(props, ref) {
  const { traitName, trait, pc, openModal, openOnRightClick } = props;

  return (
    <>
      <span
        ref={ref}
        className={styles.item}
        onClick={() => !openOnRightClick && openModal(traitName, trait)}
        onContextMenu={e => {
          if (openOnRightClick) {
            e.preventDefault();
            openModal(traitName, trait);
          }
        }}
      >
        {trait === 'spell'
          ? translateSpell(traitName)
          : trait === 'invocation'
          ? displayInvocation(traitName, trait, pc)
          : displayTrait(traitName, trait, pc)}
      </span>
    </>
  );
});
