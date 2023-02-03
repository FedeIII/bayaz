import { Link, Outlet } from '@remix-run/react';

import styles from '~/components/characters.module.css';
import menuStyles from '~/components/menus.module.css';

function NewPC() {
  return (
    <div className={styles.container}>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>

      <Outlet />
    </div>
  );
}

export default NewPC;
