import { Outlet } from '@remix-run/react';
import { useContext } from 'react';

import styles from '~/components/app.module.css';
import MenuContext from '~/components/contexts/menuContext';

function Party() {
  const menuContext = useContext(MenuContext) || {};
  const { hasMenu } = menuContext;

  return (
    <div className={hasMenu ? styles.container : styles.containerFullScreen}>
      <Outlet />
    </div>
  );
}

export default Party;
