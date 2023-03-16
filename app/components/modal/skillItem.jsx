import { forwardRef } from 'react';
import { displayTrait } from '~/domain/display';

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
        {displayTrait(traitName, trait, pc)}
      </span>
    </>
  );
});
