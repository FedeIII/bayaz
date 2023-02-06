import { Link, Outlet } from '@remix-run/react';

import styles from '~/components/characters.module.css';
import menuStyles from '~/components/menus.module.css';

function NewPC() {
  return (
    <>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>

      <Outlet />
    </>
  );
}

export default NewPC;
