import { Outlet } from '@remix-run/react';
import { useContext } from 'react';

import MenuContext from '~/components/contexts/menuContext';

import styles from '~/components/party.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function Party() {
  const menuContext = useContext(MenuContext) || {};
  const { hasMenu } = menuContext;

  return (
    <div className={hasMenu ? "app__container" : "app__container-full-screen"}>
      <Outlet />
    </div>
  );
}

export default Party;
