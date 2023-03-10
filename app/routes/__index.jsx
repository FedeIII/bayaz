import { Outlet } from '@remix-run/react';
import { useContext } from 'react';

import styles from '~/components/app.module.css';
import MenuContext from '~/components/contexts/menuContext';
import { SideBar } from '~/components/sideBar';

export default function Index() {
  const menuContext = useContext(MenuContext) || {};
  const { hasMenu, menuTitle } = menuContext;

  return (
    <div className={styles.app}>
      {hasMenu && <header className={styles.header}>{menuTitle}</header>}
      <div className={hasMenu ? styles.body : styles.bodyFullScreen}>
        <SideBar />
        <div className={hasMenu ? styles.content : styles.contentFullScreen}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
