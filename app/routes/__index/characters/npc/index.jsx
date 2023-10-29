import { Link } from '@remix-run/react';

import menuStyles from '~/components/menus.module.css';

function NpcMenu() {
  return (
    <>
      <Link to="./list" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Lista de NPCs</span>
      </Link>
      <Link to="./quick" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Crear NPC Rápido</span>
      </Link>
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
    </>
  );
}

export default NpcMenu;
