import { Outlet } from '@remix-run/react';
import { getCurrentPcPage } from '~/utils/paths';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/characters/characters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => [
  {
    title: 'Personajes',
  },
];

function Characters() {
  const pcId = getCurrentPcPage();
  useTitle('Personajes');

  return (
    <div className="characters__container">
      {/* key to refresh the page when the pcId changes */}
      <Outlet key={pcId} />
    </div>
  );
}

export default Characters;
