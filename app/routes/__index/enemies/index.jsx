import { Link } from '@remix-run/react';

import styles from '~/components/characters.module.css';
import menuStyles from '~/components/menus.module.css';

function EnemiesMenu() {
  return (
    <>
      <Link to="encounters/new" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>Encuentros</span>
      </Link>
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
      <Link to="" className={menuStyles.mainOption}>
        <span className={menuStyles.optionLabel}>/</span>
      </Link>
    </>
  );
}

export default EnemiesMenu;
