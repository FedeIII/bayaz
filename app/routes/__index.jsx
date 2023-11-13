import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useContext } from 'react';

import MenuContext from '~/components/contexts/menuContext';
import { SideBar } from '~/components/sideBar';

import appStyles from '~/components/app.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: appStyles }];
};

export const loader = async ({ params }) => {
  return json({ isForPlayers: params.userRole === 'players' });
};

export default function Index() {
  const { isForPlayers } = useLoaderData();
  const menuContext = useContext(MenuContext) || {};
  const { hasMenu, menuTitle } = menuContext;

  return (
    <div className="app">
      {hasMenu && <header className="app__header">{menuTitle}</header>}
      <div
        className={hasMenu ? 'app__body' : 'app__body app__body--full-screen'}
      >
        <SideBar isForPlayers={isForPlayers} />
        <div
          className={
            hasMenu ? 'app__content' : 'app__content app__content--ful-screen'
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
