import { forwardRef } from 'react';
import { displayTrait } from '~/domain/display';
import { translateSpell } from '~/domain/spells/spells';

import styles from './inventoryItem.module.css';

export const SkillItem = forwardRef(function SkillItem(props, ref) {
  const { traitName, trait, pc, openModal } = props;

  return (
    <>
      <span
        ref={ref}
        className={styles.item}
        onClick={() => openModal(traitName, trait)}
      >
        {trait === 'spell'
          ? translateSpell(traitName)
          : displayTrait(traitName, trait, pc)}
      </span>
    </>
  );
});
