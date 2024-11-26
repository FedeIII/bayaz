import { Outlet } from '@remix-run/react';
import { getCurrentPcPage } from '~/utils/paths';

import styles from '~/components/characters/characters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function Characters() {
  const pcId = getCurrentPcPage();

  return (
    <div className="characters__container">
      <Outlet key={pcId} />
    </div>
  );
}

export default Characters;
