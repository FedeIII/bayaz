import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useContext } from 'react';

import styles from '~/components/app.module.css';
import MenuContext from '~/components/contexts/menuContext';
import { SideBar } from '~/components/sideBar';

export const loader = async ({ params }) => {
  return json({ isForPlayers: params.userRole === 'players' });
};

export default function Index() {
  const { isForPlayers } = useLoaderData();
  const menuContext = useContext(MenuContext) || {};
  const { hasMenu, menuTitle } = menuContext;

  return (
    <div className={styles.app}>
      {hasMenu && <header className={styles.header}>{menuTitle}</header>}
      <div className={hasMenu ? styles.body : styles.bodyFullScreen}>
        <SideBar isForPlayers={isForPlayers} />
        <div className={hasMenu ? styles.content : styles.contentFullScreen}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
